import { Router } from "express";
import { handleSingleFileController } from "../controller/student.controller.js";
import upload from "../middleware/upload.js";


const fileRouter = Router();

fileRouter
.route("/single")  //localhost:8000/single
.post( upload.single("image"),handleSingleFileController)
/* 
    this API uploads image/document in the static folder (public; in this case)
    and provides the link of that file

    upload.single("image") 
        it add the image coming from image field to the public folder
*/

export default fileRouter;