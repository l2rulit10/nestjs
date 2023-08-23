import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewModel } from 'src/review/schemas/review.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    console.log(this.productModel.collection.collectionName);
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviewmodels', // Имя коллекции Review
            localField: '_id', // Поле для связи из коллекции Product
            foreignField: 'productId', // Поле для связи из коллекции Review
            as: 'reviews', // Имя поля, в которое будут добавлены результаты
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            // reviews: {
            //   $functions: {
            //     body: `function (reviews) {
            //       reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            //       return reviews;
            //     }`,
            //     args: ['$reviews'],
            //     lang: 'js',
            //   },
            // },
          },
        },
      ])
      .exec() as unknown as (ProductModel & {
      reviews: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
