import { Router } from "express";
import validation from "../middleware/validation.middleware.js";
import consultantJoiValidation from "../schema/consultant.schema.joi.validation.js";
import { createNewConsultant, fetchConsultant, fetchConsultantProfile2, forgetPassword, loginUser, resetPassword, updatePassword, updateUserProfile, verifyUserEmail, viewUserProfile } from "../controller/consultant.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.middleware.js";


let consultantRouter = Router();

consultantRouter
.route("/") //localhost:8000/consultant
.post(validation(consultantJoiValidation), createNewConsultant);

consultantRouter
.route("/verify-email-2") //localhost:8000/consultant/verify-email
.post(isAuthenticated, verifyUserEmail);

consultantRouter
.route("/login") //localhost:8000/consultant/login
.post(loginUser);

consultantRouter
.route("/view-user-profile") //localhost:8000/consultant/view-user-profile
.get(isAuthenticated, viewUserProfile);

consultantRouter
.route("/update-user-profile") //localhost:8000/consultant/update-user-profile
.patch(isAuthenticated, updateUserProfile);

consultantRouter
.route("/update-password") //localhost:8000/consultant/update-password
.patch(isAuthenticated, updatePassword);

consultantRouter
.route("/forget-password") //localhost:8000/consultant/forget-password
.post(forgetPassword);

consultantRouter
.route("/reset-password") //localhost:8000/consultant/reset-password
.patch(isAuthenticated, resetPassword);

consultantRouter
.route("/fetch-consultant") //localhost:8000/consultant/fetch-consultant
.get(isAuthenticated, fetchConsultant)

consultantRouter
.route("/fetch-consultant-profile-2") //localhost:8000/consultant/fetch-consultant-profile-2
.post(fetchConsultantProfile2)

consultantRouter
.route("/getSpecificStudent/:id") //localhost:8000/consultant/getSpecificStudent/:id


export default consultantRouter;