import { Review } from "../types";
import BaseModel from "./BaseModel";
import { TABLE_NAMES } from "../constants";

export default class ReviewModel extends BaseModel {
  constructor(model:any){
    super(TABLE_NAMES.REVIEW, model)
  }

  async insertReview(remark:string, formInputId: number, ratingId: number): Promise<Review>{
    return await this.getModel().create({ remark, ratingId, formInputId })
  }
}