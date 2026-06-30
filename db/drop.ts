import { getDb } from "../api/queries/connection";

async function main() {
  const db = getDb();
  await db.execute("DROP TABLE IF EXISTS products, articles, faq_items, gallery_images, custom_pages, site_settings");
  console.log("Tables dropped");
}

main().catch(console.error);
