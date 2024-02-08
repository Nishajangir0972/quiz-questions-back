import mongoose from 'mongoose'

const FormSchema = new mongoose.Schema({
question :String,
option1 :{
    public_id:{
        type: Object,
        required:true
    }
},
option2 :{
    public_id:{
        type: Object,
        required:true
    }
},
option3 :{
    public_id:{
        type: Object,
        required:true
    }
},
option4 :{
    public_id:{
        type: Object,
        required:true
    }
},
answer :{
    public_id:{
        type: Object,
        required:true
    }
}


})

const FormModel = mongoose.model("Form" , FormSchema)
export default FormModel