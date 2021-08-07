import { RatingModel } from '../../class'
import { expect } from 'chai'
import 'mocha'
import Database from '../../database';
let db: Database
let ratingModel: RatingModel
let sequelize:any

before(async()=> {
  db = new Database()
  sequelize = await db.initDatabaseWithValues(true)
  ratingModel = new RatingModel(db.RatingModel,sequelize)
})

describe('RatingModel Unit Test', async () => {

  it('Should insert new rating', async () => {
    let rating = await ratingModel.insertBaseRating(5)
    expect(rating.rating).to.eql(5)
    expect(rating.id).to.not.be.null
    expect(rating.updatedAt).to.not.be.null 
    expect(rating.createdAt).to.not.be.null 
  })

  it('Should get all ratings', async () => {
    let rating = await ratingModel.findAll()
    expect(rating.length).to.eql(2)
    expect(rating[0].rating).to.eql(5)
    expect(rating[0].id).to.not.be.null
    expect(rating[0].updatedAt).to.not.be.null 
    expect(rating[0].createdAt).to.not.be.null 
  })

  it('Should get rating breakdown', async () => {
    let rating = await ratingModel.getRatingBreakdown()
    expect(rating.length).to.eql(1)
    expect(rating[0].rating).to.eql(5)
    expect(rating[0].count).to.eql(2)
  })


  Promise.resolve()
})


