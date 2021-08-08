import { Rating, RatingBreakdown, RatingCreationAttributes } from "../types";
import BaseModel from "./BaseModel";
import { TABLE_NAMES } from "../constants";
import { ModelDefined } from "sequelize/types";
export default class RatingModel extends BaseModel {
  sequelize: any
  constructor(model:ModelDefined<Rating,RatingCreationAttributes>, sequelize: any){
    super(TABLE_NAMES.RATING, model)
    this.sequelize = sequelize
  }

  async insertBaseRating(rating:number): Promise<Rating>{
    return await this.getModel().create({ rating: rating })
  }

  async getRatingBreakdown(): Promise<Array<RatingBreakdown>>{
    let res = await this.getModel().findAll({
      attributes: ['rating', [this.sequelize.fn('COUNT', this.sequelize.col('rating')), 'count']], group: ['rating'], raw:true
    })
    return res
  }
}