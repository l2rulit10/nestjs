import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageModel, TopPageSchema } from './schemas/top-page.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchema },
    ]),
  ],
  providers: [TopPageService],
  exports: [TopPageService]
})
export class TopPageModule {}
