import express from "express"
import FormModel from "./FormModel.js"

const FormRouter = express.Router()

FormRouter.post("/add" , async(req, res)=>{
let AddQuestions = new FormModel(req.body)
let result = await AddQuestions.save()
res.json(result)

})



FormRouter.get("/show", async (req, res) => {
    let result = await FormModel.findOne({})
    res.json(result)
})
export default FormRouter;