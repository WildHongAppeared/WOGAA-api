import { FormInputModel } from '../../class'
import { expect } from 'chai'
import 'mocha'
import Database from '../../database';
let db: Database
let formInputModel: FormInputModel

before(async()=> {
  db = new Database()
  await db.initDatabaseWithValues(true)
  formInputModel = new FormInputModel(db.FormInputModel)
})

describe('FormInputModel Unit Test', async () => {

  it('Should insert new form input', async () => {
    let formInput = await formInputModel.insertFormInput("Test","Test Subtitle", "email")
    expect(formInput.title).to.eql("Test")
    expect(formInput.subtitle).to.eql("Test Subtitle")
    expect(formInput.type).to.eql("email")
    expect(formInput.id).to.not.be.null
    expect(formInput.updatedAt).to.not.be.null 
    expect(formInput.createdAt).to.not.be.null 
  })

  it('Should get all form inputs', async () => {
    let formInput = await formInputModel.findAll()
    expect(formInput.length).to.eql(2)
    expect(formInput[1].title).to.eql("Test")
    expect(formInput[1].subtitle).to.eql("Test Subtitle")
    expect(formInput[1].type).to.eql("email")
    expect(formInput[1].id).to.not.be.null
    expect(formInput[1].updatedAt).to.not.be.null 
    expect(formInput[1].createdAt).to.not.be.null 
  })


  Promise.resolve()
})


