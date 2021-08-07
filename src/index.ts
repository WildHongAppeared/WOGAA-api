const express = require( "express" );
const app = express();
const port = 8080;
const cors = require('cors');
import { Response, Request} from 'express'
import Database from './database';
import { RatingModel, FormInputModel, ReviewModel } from './class'
let db = new Database()
let sequelize:any 

app.use(cors());
app.use(express.json())
app.options('*', cors());

app.get('/health', ( req:Request, res:Response ) => { //for health check
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }
  res.status(200).send(data);
});

// POST api to create rating
// request parameter: 
// body: 
// rating : number|string
// response: Rating
app.post( "/api/v1/rating/create", async ( req:Request, res:Response ) => { 
  let { rating } = req.body 
  if(isNaN(rating) || Number(rating) < 0){
    res.status(400).send('Invalid rating score')
  }
  try {
    rating = Number(rating)
    let ratingModel = new RatingModel(db.RatingModel, sequelize)
    let createdRating = await ratingModel.insertBaseRating(rating)
    res.status(200).send(createdRating)
  } catch (e){
    res.status(500).send(e.errorMessage)
  }
})


// GET api to get rating breakdown
// request parameter: -
// response: 
//    Array:
//      count: number
//      rating: number
app.get( "/api/v1/rating/breakdown", async ( req:Request, res:Response ) => { 
  try {
    let ratingModel = new RatingModel(db.RatingModel, sequelize)
    let breakdown = await ratingModel.getRatingBreakdown()
    console.log('@BREAKDOWN - ', breakdown)
    res.status(200).send(breakdown)
  } catch (e){
    res.status(500).send(e.errorMessage)
  }
})

// POST api to create rating
// request parameter: 
// path: 
//  ratingId : string|number
// body: Array
//  formInputId : number|string
//   remark : string
// response: Array<Review>
app.post( "/api/v1/rating/:ratingId/review", async ( req:Request, res:Response ) => { 
  let { ratingId } = req.params
  let body = req.body
  if(!Array.isArray(body)){
    res.status(400).send('Invalid body')
  }
  let reviewModel = new ReviewModel(db.ReviewModel)
  try {
    let createdReviewPromises = body.map(async(review:any) => {
      let ret = await reviewModel.insertReview(review.remark, Number(review.formInputId), Number(ratingId))
      return ret
    })
    let createdReviews = await Promise.all(createdReviewPromises)
    res.status(200).send(createdReviews)
  } catch (e){
    res.status(500).send(e.errorMessage)
  }
})

// POST api to create form input
// request parameter: 
// body: 
//  title : string
//  subtitle : string
//  type: "text"|"email"|"linear_scale"
// response: FormInput
app.post( "/api/v1/form/create", async ( req:Request, res:Response ) => { 
  let { title, subtitle, type } = req.body 
  if(!(title) || title.length < 1){
    res.status(400).send('Invalid title')
  }
  let formInputModel = new FormInputModel(db.FormInputModel)
  try {
    let createdFormInput = await formInputModel.insertFormInput(title, subtitle, type)
    res.status(200).send(createdFormInput)
  } catch (e){
    res.status(500).send(e.errorMessage)
  }
})

// GET api to get all form input
// request parameter: -
// response: Array<FormInput>
app.get( "/api/v1/form/list", async ( req:Request, res:Response ) => { 
  let formInputModel = new FormInputModel(db.FormInputModel)
  try {
    let createdFormInput = await formInputModel.findAll()
    res.status(200).send(createdFormInput)
  } catch (e){
    res.status(500).send(e.errorMessage)
  }
})

// start the Express server
db.initDatabaseWithValues().then((s) => { //initialize database before starting express
  sequelize = s
  app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
})
