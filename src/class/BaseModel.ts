

import { TABLE_NAMES } from "../constants";
export default class BaseModel{
  private tableName: TABLE_NAMES 
  private model: any
  constructor(tableName:TABLE_NAMES, model:any){
    this.tableName = tableName
    this.model = model
  }

  getModelName():TABLE_NAMES{
    return this.tableName
  }

  findAll():Array<any>{
    return this.model.findAll()
  }

  getModel(){
    return this.model
  }


}