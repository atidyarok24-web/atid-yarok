import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

const SIRV_TOKEN_URL = "https://api.sirv.com/v2/token";
const SIRV_UPLOAD_URL = "https://api.sirv.com/v2/files/upload";

type SirvTokenResponse = {
  token?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function sanitizeFilename(filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${Date.now()}-${safe}`;
}

function normalizeFolder(folder: string) {
  const clean = folder.trim().replace(/^\/+|\/+$/g, "");
  return `/${clean || "Images"}`;
}

function getContentType(filename: string) {
  const ext = filename.toLowerCase().split(".").pop();

  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  if (ext === "svg") return "image/svg+xml";
  if (ext === "mp4") return "video/mp4";
  if (ext === "webm") return "video/webm";

  return "application/octet-stream";
}

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

async function getSirvToken() {
  const clientId = requiredEnv("SIRV_CLIENT_ID");
  const clientSecret = requiredEnv("SIRV_CLIENT_SECRET");

  const response = await fetch(SIRV_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sirv token failed: ${response.status} ${text}`);
  }

  const data = (await response.json()) as SirvTokenResponse;

  if (!data.token) {
    throw new Error("Sirv token response did not include token");
  }

  return data.token;
}

async function uploadToSirv(options: {
  filename: string;
  buffer: Buffer;
  contentType: string;
  folder: string;
}) {
  const token = await getSirvToken();
  const sirvPath = `${normalizeFolder(options.folder)}/${options.filename}`;

  const response = await fetch(
    `${SIRV_UPLOAD_URL}?filename=${encodeURIComponent(sirvPath)}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": options.contentType,
      },
      body: bufferToArrayBuffer(options.buffer),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sirv upload failed: ${response.status} ${text}`);
  }

  const cdnBase = requiredEnv("SIRV_CDN_BASE").replace(/\/+$/g, "");

  return {
    path: sirvPath,
    url: `${cdnBase}${sirvPath}`,
  };
}

export const uploadRouter = createRouter({
  uploadFile: publicQuery
    .input(
      z.object({
        filename: z.string().min(1),
        data: z.string().min(1),
        folder: z.string().default("Images"),
      }),
    )
    .mutation(async ({ input }) => {
      const base64Data = input.data.replace(/^data:[^;]+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length === 0) {
        throw new Error("Empty file");
      }

      const safeName = sanitizeFilename(input.filename);
      const contentType = getContentType(input.filename);

      const result = await uploadToSirv({
        filename: safeName,
        buffer,
        contentType,
        folder: process.env.SIRV_UPLOAD_FOLDER || input.folder || "Images",
      });

      return { url: result.url };
    }),

  uploadVideo: publicQuery
    .input(
      z.object({
        filename: z.string().min(1),
        data: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const base64Data = input.data.replace(/^data:video\/[^;]+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length === 0) {
        throw new Error("Empty video file");
      }

      const safeName = sanitizeFilename(input.filename);
      const contentType = getContentType(input.filename);

      const result = await uploadToSirv({
        filename: safeName,
        buffer,
        contentType,
        folder: "Videos",
      });

      return { url: result.url };
    }),

  listFiles: publicQuery
    .input(z.object({ folder: z.string().default("Images") }).optional())
    .query(async () => {
      return [];
    }),

  deleteFile: publicQuery
    .input(
      z.object({
        filename: z.string().min(1),
        folder: z.string().default("Images"),
      }),
    )
    .mutation(async () => {
      return {
        success: false,
        message: "Delete from Sirv is not implemented yet",
      };
    }),
});