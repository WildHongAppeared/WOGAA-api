import { Sequelize, STRING, INTEGER, ModelDefined } from "sequelize";
import * as dotenv from "dotenv";
import { TABLE_NAMES } from "../constants";
import { FormInput, Rating, RatingCreationAttributes, Review, ReviewCreationAttributes, FormInputCreationAttributes } from "../types";
dotenv.config();

export default class Database {
  FormInputModel: ModelDefined<FormInput, FormInputCreationAttributes>
  RatingModel: ModelDefined<Rating,RatingCreationAttributes>
  ReviewModel: ModelDefined<Review, ReviewCreationAttributes>

  async initDatabaseWithValues(forceDrop = false){
    var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: Number(process.env.PORT)
    });
    
    this.FormInputModel = sequelize.define(TABLE_NAMES.FORM_INPUT, { //create form input table if does not exist
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: STRING,
        allowNull: false
      },
      subtitle: {
        type: STRING
      },
      type: {
        type: STRING,
        allowNull: false,
        defaultValue: 'text'
      }
    }, {
      freezeTableName: true 
    })

    this.RatingModel = sequelize.define(TABLE_NAMES.RATING, { //create rating table if does not exist
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rating: {
        type: INTEGER,
        allowNull: false
      }
    }, {
      freezeTableName: true 
    })

    this.ReviewModel = sequelize.define(TABLE_NAMES.REVIEW, { //create review table if does not exist
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      remark: {
        type: STRING,
        allowNull: false
      }
    }, {
      freezeTableName: true 
    })

    this.RatingModel.hasMany(this.ReviewModel, { // review should be tied to rating id (explained in readme under Design Decisions)
      foreignKey: {
        name: 'ratingId',
        allowNull: false
      }
    })

    this.ReviewModel.belongsTo(this.FormInputModel, { // review should be tied to form input id (explained in readme under Design Decisions)
      foreignKey: {
        name: 'formInputId',
        allowNull: false
      }
    })
    
    await sequelize.sync({ force: forceDrop }) //force: true will drop all existing tables before recreating
    return sequelize
    
  }

}
