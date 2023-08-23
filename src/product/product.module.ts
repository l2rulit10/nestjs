import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './schemas/product.schema';
import { ReviewModel, ReviewSchema } from 'src/review/schemas/review.schema';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
  ],
  providers: [ProductService],
})
export class ProductModule {}
