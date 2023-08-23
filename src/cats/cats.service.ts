import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async checkConnection(): Promise<string> {
    try {
      await this.connection.db.admin().ping();
      return 'Connection to MongoDB established successfully.';
    } catch (error) {
      return 'Failed to connect to MongoDB: ' + error.message;
    }
  }
}
