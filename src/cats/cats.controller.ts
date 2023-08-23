import { UserEmail } from './../decorators/user-email.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('database')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('check-connection')
  async checkConnection(@UserEmail() email: string): Promise<string> {
    console.log(email);
    return this.catsService.checkConnection();
  }
}
