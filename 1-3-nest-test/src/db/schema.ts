import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export const productTranslationsTable = pgTable('product_translations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  language_code: varchar({ length: 10 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  product_id: integer('product_id')
    .notNull()
    .references(() => productsTable.id, { onDelete: 'cascade' }),
});

export type Product = typeof productsTable.$inferSelect;
export type ProductTranslation = typeof productTranslationsTable.$inferSelect;
