import { FormInput } from "../types";
import BaseModel from "./BaseModel";
import { TABLE_NAMES } from "../constants";

export default class RatingModel extends BaseModel {
  constructor(model:any){
    super(TABLE_NAMES.FORM_INPUT, model)
  }

  async insertFormInput(title: string, subtitle: string, type: string): Promise<FormInput>{
    return await this.getModel().create({ title, subtitle, type })
  }
}