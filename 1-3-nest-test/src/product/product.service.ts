import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto, SearchProductDTO } from 'src/dto/product.dto';
import { Product, ProductTranslation } from '../db/schema';
import { PostgresError } from 'postgres';
import sql from '../postgres';

@Injectable()
export class ProductService {
  async createProduct(dto: CreateProductDto) {
    const { translations } = dto;
    try {
      const products = await sql<Product[]>`
          INSERT INTO products DEFAULT VALUES
          RETURNING id
        `;
      const transationsOutput: Array<ProductTranslation> = [];
      await sql.begin(async (sql) => {
        for (const translation of translations) {
          const { languageCode, name, description } = translation;

          const t = await sql<ProductTranslation[]>`
              INSERT into product_translations
                (product_id, language_code, name, description)
              VALUES
                (${products[0].id}, ${languageCode}, ${name}, ${description})
              RETURNING *
          `;
          transationsOutput.push(t[0]);
        }
      });

      return {
        id: products[0].id,
        translations: transationsOutput,
      };
    } catch (error) {
      if (error instanceof PostgresError) {
        if (error.code === '23505') {
          throw new ConflictException('Duplicate entry');
        }
        throw new BadRequestException('Postgres has an error');
      }
      throw error;
    }
  }

  async searchProduct(
    dto: SearchProductDTO,
    queryString: { page: number; limit: number },
  ) {
    const { limit, page } = queryString;
    const { name } = dto;
    const offset = (page - 1) * limit;
    try {
      const result = await sql`
        SELECT pt.*, p.id
        FROM product_translations pt
        INNER JOIN products p
          ON p.id = pt.product_id
          WHERE pt.name ILIKE ${'%' + name + '%'}
        LIMIT ${limit}
        OFFSET ${offset}
    `;

      const countResult = await sql`
        SELECT COUNT(*) as total
        FROM product_translations pt
        WHERE pt.name ILIKE ${'%' + name + '%'}
        `;

      const totalItems = parseInt(countResult[0].total, 10);
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data: result,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      if (error instanceof PostgresError) {
        if (error.code === '23505') {
          throw new ConflictException('Duplicate entry');
        }
        throw new BadRequestException('Postgres has an error');
      }
      throw error;
    }
  }
}
