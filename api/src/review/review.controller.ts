import { Body, Controller, Post, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ReviewCreateDto } from './dto/review-create.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/create-review')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@Body() dto: ReviewCreateDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.reviewService.createReview(files, dto);
  }


}
