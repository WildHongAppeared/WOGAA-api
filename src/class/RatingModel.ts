import { Rating } from "../types";
import BaseModel from "./BaseModel";
import { TABLE_NAMES } from "../constants";

export default class RatingModel extends BaseModel {
  constructor(model:any){
    super(TABLE_NAMES.RATING, model)
  }

  async insertBaseRating(rating:number): Promise<Rating>{
    return await this.getModel().create({ rating: rating })
  }
}