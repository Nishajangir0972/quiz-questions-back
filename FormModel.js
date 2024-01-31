import mongoose from 'mongoose'

const FormSchema = new mongoose.Schema({
question :String,
option1 :String,
option2 :String,
option3 :String,
option4 :String,
answer :String


})

const FormModel = mongoose.model("Form" , FormSchema)
export default FormModel