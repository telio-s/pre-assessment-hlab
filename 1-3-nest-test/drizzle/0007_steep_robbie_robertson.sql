ALTER TABLE "product_translations" DROP CONSTRAINT "unique_product_language";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_name_unique";--> statement-breakpoint
DROP INDEX "idx_product_translations_product_lang";--> statement-breakpoint
ALTER TABLE "product_translations" ADD COLUMN "description" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "description";