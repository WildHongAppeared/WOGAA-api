import { Review, ReviewCreationAttributes } from "../types";
import BaseModel from "./BaseModel";
import { TABLE_NAMES } from "../constants";
import { ModelDefined } from "sequelize/types";

export default class ReviewModel extends BaseModel {
  constructor(model:ModelDefined<Review, ReviewCreationAttributes>){
    super(TABLE_NAMES.REVIEW, model)
  }

  async insertReview(remark:string, formInputId: number, ratingId: number): Promise<Review>{
    return await this.getModel().create({ remark, ratingId, formInputId })
  }
}