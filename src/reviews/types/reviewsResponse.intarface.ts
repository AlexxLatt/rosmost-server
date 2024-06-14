import { ReviewsEntity } from '../reviews.entity';

export interface ReviewsResponseInterface {
  reviews: ReviewsEntity[];
  reviewsCount: number;
}
