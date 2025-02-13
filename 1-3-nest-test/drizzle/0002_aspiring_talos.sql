CREATE TABLE "product_translations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_translations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"language_code" varchar(10) NOT NULL,
	"product_id" integer NOT NULL,
	CONSTRAINT "unique_product_language" UNIQUE("product_id","language_code")
);
--> statement-breakpoint
ALTER TABLE "product_translations" ADD CONSTRAINT "product_translations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_product_translations_product_lang" ON "product_translations" USING btree ("product_id","language_code");