import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './schemas/review.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto) {
    return this.reviewModel.create(dto);
  }

  async delete(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string) {
    console.log(this.reviewModel.collection.collectionName, ReviewModel.name);
    return this.reviewModel.find({ productId }).exec();
  }

  async get() {
    return this.reviewModel.find().exec();
  }
}
