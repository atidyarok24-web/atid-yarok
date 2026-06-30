import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { writeFile, mkdir, readdir, unlink, stat } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGES_DIR = join(PUBLIC_DIR, "images");
const VIDEOS_DIR = join(PUBLIC_DIR, "videos");

// Ensure directories exist
for (const dir of [IMAGES_DIR, VIDEOS_DIR]) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

export const uploadRouter = createRouter({
  // Upload any file (image or video) from base64
  uploadFile: publicQuery
    .input(z.object({
      filename: z.string().min(1),
      data: z.string().min(1), // base64 data
      folder: z.string().default("images"),
    }))
    .mutation(async ({ input }) => {
      const targetDir = join(PUBLIC_DIR, input.folder);
      if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
      }

      // Remove data:xxx/xxx;base64, prefix if present
      const base64Data = input.data.replace(/^data:[^;]+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Validate it's not empty
      if (buffer.length === 0) {
        throw new Error("Empty file");
      }

      // Sanitize filename
      const safeName = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filepath = join(targetDir, safeName);

      await writeFile(filepath, buffer);

      return { url: `/${input.folder}/${safeName}` };
    }),

  // Upload video file from base64
  uploadVideo: publicQuery
    .input(z.object({
      filename: z.string().min(1),
      data: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      const targetDir = VIDEOS_DIR;

      // Remove data:video/xxx;base64, prefix if present
      const base64Data = input.data.replace(/^data:video\/[^;]+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length === 0) {
        throw new Error("Empty video file");
      }

      const safeName = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filepath = join(targetDir, safeName);

      await writeFile(filepath, buffer);

      return { url: `/videos/${safeName}` };
    }),

  // List files in a folder
  listFiles: publicQuery
    .input(z.object({ folder: z.string().default("images") }).optional())
    .query(async ({ input }) => {
      const folder = input?.folder ?? "images";
      const targetDir = join(PUBLIC_DIR, folder);

      if (!existsSync(targetDir)) return [];

      const files = await readdir(targetDir);
      const items = [];
      for (const name of files) {
        const filepath = join(targetDir, name);
        const s = await stat(filepath);
        if (s.isFile()) {
          items.push({
            name,
            url: `/${folder}/${name}`,
            size: s.size,
          });
        }
      }
      return items;
    }),

  // Delete a file
  deleteFile: publicQuery
    .input(z.object({ filename: z.string().min(1), folder: z.string().default("images") }))
    .mutation(async ({ input }) => {
      const filepath = join(PUBLIC_DIR, input.folder, input.filename);

      // Security: ensure file is inside public directory
      if (!filepath.startsWith(PUBLIC_DIR)) {
        throw new Error("Invalid path");
      }

      if (existsSync(filepath)) {
        await unlink(filepath);
        return { success: true };
      }

      return { success: false, message: "File not found" };
    }),
});
