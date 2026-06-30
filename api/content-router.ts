import { z } from "zod";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import {
  products,
  articles,
  faqItems,
  galleryImages,
  customPages,
  siteSettings,
} from "@db/schema";

export const contentRouter = createRouter({
  // ── Products ──
  productList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(products);
  }),

  productGet: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.id, input.id));

      return rows[0] ?? null;
    }),

  productCreate: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        category: z.string(),
        image: z.string(),
        description: z.string(),
        specs: z.string(),
        features: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(products)
        .values(input)
        .returning({ id: products.id });

      return { id: result[0].id };
    }),

  productUpdate: publicQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        category: z.string(),
        image: z.string(),
        description: z.string(),
        specs: z.string(),
        features: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();

      await db.update(products).set(data).where(eq(products.id, id));

      return { success: true };
    }),

  productDelete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.delete(products).where(eq(products.id, input.id));

      return { success: true };
    }),

  // ── Articles ──
  articleList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(articles);
  }),

  articleGet: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(articles)
        .where(eq(articles.id, input.id));

      return rows[0] ?? null;
    }),

  articleCreate: publicQuery
    .input(
      z.object({
        title: z.string().min(1),
        category: z.string(),
        image: z.string(),
        excerpt: z.string(),
        content: z.string(),
        date: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(articles)
        .values(input)
        .returning({ id: articles.id });

      return { id: result[0].id };
    }),

  articleUpdate: publicQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        category: z.string(),
        image: z.string(),
        excerpt: z.string(),
        content: z.string(),
        date: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();

      await db.update(articles).set(data).where(eq(articles.id, id));

      return { success: true };
    }),

  articleDelete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.delete(articles).where(eq(articles.id, input.id));

      return { success: true };
    }),

  // ── FAQ ──
  faqList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(faqItems);
  }),

  faqCreate: publicQuery
    .input(z.object({ question: z.string().min(1), answer: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(faqItems)
        .values(input)
        .returning({ id: faqItems.id });

      return { id: result[0].id };
    }),

  faqUpdate: publicQuery
    .input(
      z.object({
        id: z.number(),
        question: z.string().min(1),
        answer: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();

      await db.update(faqItems).set(data).where(eq(faqItems.id, id));

      return { success: true };
    }),

  faqDelete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.delete(faqItems).where(eq(faqItems.id, input.id));

      return { success: true };
    }),

  // ── Gallery ──
  galleryList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(galleryImages);
  }),

  galleryCreate: publicQuery
    .input(
      z.object({
        src: z.string().min(1),
        title: z.string().min(1),
        location: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(galleryImages)
        .values(input)
        .returning({ id: galleryImages.id });

      return { id: result[0].id };
    }),

  galleryDelete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.delete(galleryImages).where(eq(galleryImages.id, input.id));

      return { success: true };
    }),

  // ── Custom Pages ──
  pageList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(customPages);
  }),

  pageGet: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(customPages)
        .where(eq(customPages.slug, input.slug));

      return rows[0] ?? null;
    }),

  pageCreate: publicQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db
        .insert(customPages)
        .values(input)
        .returning({ id: customPages.id });

      return { id: result[0].id };
    }),

  pageUpdate: publicQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const db = getDb();

      await db.update(customPages).set(data).where(eq(customPages.id, id));

      return { success: true };
    }),

  pageDelete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.delete(customPages).where(eq(customPages.id, input.id));

      return { success: true };
    }),

  // ── Site Settings ──
  settingsList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(siteSettings);
  }),

  settingsGet: publicQuery
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, input.key));

      return rows[0]?.value ?? null;
    }),

  settingsSet: publicQuery
    .input(z.object({ key: z.string().min(1), value: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, input.key));

      if (existing.length > 0) {
        await db
          .update(siteSettings)
          .set({ value: input.value })
          .where(eq(siteSettings.key, input.key));
      } else {
        await db.insert(siteSettings).values(input);
      }

      return { success: true };
    }),
});