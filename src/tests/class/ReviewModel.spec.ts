import { RatingModel, ReviewModel, FormInputModel } from '../../class'
import { expect } from 'chai'
import 'mocha'
import Database from '../../database';
import { FormInput, Rating, Review} from '../../types';
let db: Database
let ratingModel: RatingModel
let reviewModel: ReviewModel
let formInputModel: FormInputModel
let rating: Rating
let formInput: FormInput
let review: Review
let sequelize:any

before(async()=> {
  db = new Database()
  sequelize = await db.initDatabaseWithValues(true)
  ratingModel = new RatingModel(db.RatingModel, sequelize)
  reviewModel = new ReviewModel(db.ReviewModel)
  formInputModel = new FormInputModel(db.FormInputModel)
  rating = await ratingModel.insertBaseRating(5)
  formInput = await formInputModel.insertFormInput('Unit Test', 'Unit Test Subtitle', 'email')
})

describe('ReviewModel Unit Test', async () => {

  it('Should insert new review', async () => {
    review = await reviewModel.insertReview('Test remark', formInput.id, rating.id)
    expect(review.remark).to.eql('Test remark')
    expect(review.id).to.not.be.null
    expect(review.updatedAt).to.not.be.null 
    expect(review.createdAt).to.not.be.null 
    expect(review.formInputId).to.eql(formInput.id)
    expect(review.ratingId).to.eql(rating.id)
  })

  it('Should get all review', async () => {
    let review = await reviewModel.findAll()
    expect(review.length).to.eql(1)
    expect(review[0].id).to.not.be.null
    expect(review[0].updatedAt).to.not.be.null 
    expect(review[0].createdAt).to.not.be.null 
    expect(review[0].formInputId).to.eql(formInput.id)
    expect(review[0].ratingId).to.eql(rating.id)
  })


  Promise.resolve()
})


