import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './schemas/review.schema';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
