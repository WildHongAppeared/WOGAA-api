import { BaseInterface } from "./Base";

export interface Rating extends BaseInterface{
  rating: number
}

export interface Review extends BaseInterface {
  ratingId: string
  formInputId: string
  remark: string
}

export interface RatingBreakdown {
  rating: number
  count: number
}