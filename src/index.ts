const express = require( "express" );
const app = express();
const port = 8080;
const cors = require('cors');
import { Response, Request} from 'express'
import Database from './database';
import { RatingModel, FormInputModel, ReviewModel } from './class'
let db = new Database()


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

app.post( "/api/v1/rating/create", async ( req:Request, res:Response ) => { //in ideal scenario would use router for different "microservices"
  let { rating } = req.body 
  if(isNaN(rating) || Number(rating) < 0){
    res.status(400).send('Invalid rating score')
  }
  rating = Number(rating)
  let ratingModel = new RatingModel(db.RatingModel)
  let createdRating = await ratingModel.insertBaseRating(rating)
  res.status(200).send(createdRating)
})

app.post( "/api/v1/rating/:ratingId/review", async ( req:Request, res:Response ) => { //in ideal scenario would use router for different "microservices"
  let { ratingId } = req.params
  let body = req.body
  if(!Array.isArray(body)){
    res.status(400).send('Invalid body')
  }
  let reviewModel = new ReviewModel(db.ReviewModel)
  let createdReviewPromises = body.map(async(review:any) => {
    let ret = await reviewModel.insertReview(review.remark, review.formInputId, Number(ratingId))
    console.log('@REVIEW - ', ret)
    return ret
  })
  let createdReviews = await Promise.all(createdReviewPromises)
  res.status(200).send(createdReviews)
})

app.post( "/api/v1/form/create", async ( req:Request, res:Response ) => { //in ideal scenario would use router for different "microservices"
  let { title, subtitle, type } = req.body 
  if(!(title) || title.length < 1){
    res.status(400).send('Invalid title')
  }
  let formInputModel = new FormInputModel(db.FormInputModel)
  let createdFormInput = await formInputModel.insertFormInput(title, subtitle, type)
  res.status(200).send(createdFormInput)
})

app.post( "/api/v1/form/list", async ( req:Request, res:Response ) => { //in ideal scenario would use router for different "microservices"
  let formInputModel = new FormInputModel(db.FormInputModel)
  let createdFormInput = await formInputModel.findAll()
  res.status(200).send(createdFormInput)
})

// start the Express server
db.initDatabaseWithValues().then(() => {
  app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
})
