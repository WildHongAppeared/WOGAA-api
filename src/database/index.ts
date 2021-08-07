import { Sequelize, STRING, INTEGER } from "sequelize";
import * as dotenv from "dotenv";
import { TABLE_NAMES } from "../constants";
dotenv.config();

export default class Database {
  FormInputModel:any
  RatingModel:any
  ReviewModel:any

  async initDatabaseWithValues(forceDrop = false){
    var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: Number(process.env.PORT)
    });
    
    this.FormInputModel = sequelize.define(TABLE_NAMES.FORM_INPUT, {
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

    this.RatingModel = sequelize.define(TABLE_NAMES.RATING, {
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

    this.ReviewModel = sequelize.define(TABLE_NAMES.REVIEW, {
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

    this.RatingModel.hasMany(this.ReviewModel, {
      foreignKey: {
        name: 'ratingId',
        allowNull: false
      }
    })

    this.ReviewModel.belongsTo(this.FormInputModel, {
      foreignKey: {
        name: 'formInputId',
        allowNull: false
      }
    })
    
    await sequelize.sync({ force: forceDrop })
    return true

    //const insertForm = `INSERT INTO ${TABLE_NAMES.FORM_INPUT} (title, subtitle, required, type) VALUES ("What did you like the most?", "Tell us about your experience", 0, "text"), ("What did you like the least?", "Let us know how we can improve", 0, "text"), ("Give us your rating", "", 0, "linear_scale"), ("Your email", "Your email address", 0, "email");`
    
  }

}
