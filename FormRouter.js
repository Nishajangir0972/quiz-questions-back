// // import express from "express"
// // import FormModel from "./FormModel.js"
// // import multer from "multer"
// // import cloudinary from "./cloudinary.js"


// // const FormRouter = express.Router()







// // // const upload = multer({ storage: storage });

// // FormRouter.post("/add", async (req, res) => {
// //     const question = req.body.question
// //     const option1 = req.files
// //     const option2 = req.files
// //     const option3 = req.files
// //     const option4 = req.files
// //     const answer = req.files
// //     let AddQuestions = new FormModel({ question, option1, option2, option3, option4, answer })
// //     let result = await cloudinary.uploader.upload(file.temFilePath,{
// //         public_id:`${Date.now()}`,
// //         folder:"images"
// //     })
// //     res.json(result)

// // })



// // FormRouter.get("/show", async (req, res) => {
// //     let result = await FormModel.findOne({})
// //     res.json(result)
// // })
// // export default FormRouter;


// import express from "express";
// import FormModel from "./FormModel.js";
// import multer from "multer";
// import cloudinary from "./cloudinary.js";

// const FormRouter = express.Router();


// const storage = multer.diskStorage({});
// const upload = multer({ storage: storage });

// FormRouter.post("/add", upload.single('file'), async (req, res) => {
//     const question = req.body.question;
//     const option1 = req.body.option1;
//     const option2 = req.body.option2;
//     const option3 = req.body.option3;
//     const option4 = req.body.option4;
//     const answer = req.body.answer;

//     // Upload image to Cloudinary
//     let result;
//     if (req.file) {
//         result = await cloudinary.uploader.upload(req.file.tempFilePath, {
//             folder: "images"
//         });
//     }

//     // Create new FormModel instance with image URL
//     const AddQuestions = new FormModel({
//         question,
//         option1,
//         option2,
//         option3,
//         option4,
//         answer,
//         imageUrl: result ? result.secure_url : ""
//     });

//     try {
//         const savedQuestion = await AddQuestions.save();
//         res.json(savedQuestion);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// FormRouter.get("/show", async (req, res) => {
//     try {
//         const result = await FormModel.findOne({});
//         res.json(result);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// export default FormRouter;


import express from "express";
import FormModel from "./FormModel.js";
import multer from "multer";
import cloudinary from "./cloudinary.js";
import fileUpload from "express-fileupload";

const FormRouter = express.Router();


FormRouter.use(fileUpload()); // Add express-fileupload middleware

FormRouter.post("/add", async (req, res) => {
    console.log(req.files);
    const question = req.body.question;
    const option1 = req.files.option1; // Access uploaded files directly from req.files
    const option2 = req.files.option2;
    const option3 = req.files.option3;
    const option4 = req.files.option4;
    const answer = req.files.answer;

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all([
        uploadToCloudinary(option1),
        uploadToCloudinary(option2),
        uploadToCloudinary(option3),
        uploadToCloudinary(option4),
        uploadToCloudinary(answer)
    ]);

    // Create new FormModel instance with image URLs
    const AddQuestions = new FormModel({
        question,
        option1: uploadedImages[0].secure_url,
        option2: uploadedImages[1].secure_url,
        option3: uploadedImages[2].secure_url,
        option4: uploadedImages[3].secure_url,
        answer: uploadedImages[4].secure_url
    });

    try {
        const savedQuestion = await AddQuestions.save();
        res.json(savedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Function to upload file to Cloudinary
async function uploadToCloudinary(file) {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "images"
        });
        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}

// Other routes and middleware

export default FormRouter;