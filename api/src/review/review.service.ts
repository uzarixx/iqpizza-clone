import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary';
import { Express } from 'express';
import { ReviewCreateDto } from './dto/review-create.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './review.model';
import { ReviewPhoto } from './reviewPhoto.model';

@Injectable()
export class ReviewService {

  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(Review) private reviewRepository: typeof Review,
    @InjectModel(ReviewPhoto) private reviewPhotoRepository: typeof ReviewPhoto) {
  }

  async createReview(files: Array<Express.Multer.File>, dto: ReviewCreateDto) {
    const review = await this.reviewRepository.create(dto);
    const images = (await Promise.all(files.map((e) => this.cloudinaryService.uploadFile(e)))).map((el) => ({
      imageLink: el.url,
      reviewId: review.id,
    }));
    await this.reviewPhotoRepository.bulkCreate(images);
    return 'Вiдгук надiслан';
  }


}
