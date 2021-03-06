import { BaseInterface } from "./Base";
import { Optional } from "sequelize";

const enum FORM_TYPE {
  email = 'email',
  text = 'text',
  linear_scale = 'linear_scale'
}

export interface FormInput extends BaseInterface {
  title: string
  subtitle?: string
  type: FORM_TYPE
}

export interface FormInputCreationAttributes extends Optional<FormInput, 'id' | 'updatedAt' | 'createdAt'> {};