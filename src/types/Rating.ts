import { BaseInterface } from "./Base";
import { Optional} from "sequelize";

export interface Rating extends BaseInterface{
  rating: number
}

export interface RatingCreationAttributes extends Optional<Rating, 'id' | 'updatedAt' | 'createdAt'> {};
export interface Review extends BaseInterface {
  ratingId: string
  formInputId: string
  remark: string
}

export interface ReviewCreationAttributes extends Optional<Review, 'id' | 'updatedAt' | 'createdAt'> {};
export interface RatingBreakdown {
  rating: number
  count: number
}