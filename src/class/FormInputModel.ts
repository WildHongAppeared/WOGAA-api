import { FormInput, FormInputCreationAttributes, Rating } from "../types";
import BaseModel from "./BaseModel";
import { TABLE_NAMES } from "../constants";
import { ModelDefined } from "sequelize/types";

export default class FormInputModel extends BaseModel {
  constructor(model:ModelDefined<FormInput, FormInputCreationAttributes>){
    super(TABLE_NAMES.FORM_INPUT, model)
  }

  async insertFormInput(title: string, subtitle: string, type: string): Promise<FormInput>{
    return await this.getModel().create({ title, subtitle, type })
  }
}