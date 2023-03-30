import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './review.model';
import { ReviewPhoto } from './reviewPhoto.model';
import * as process from 'process';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [CloudinaryModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      isGlobal: true,
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    }),
    inject: [ConfigService],
  }), SequelizeModule.forFeature([Review, ReviewPhoto])],
})
export class ReviewModule {
}
