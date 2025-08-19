import { Router } from "express";
import validation from "../middleware/validation.middleware.js";
import studentJoiValidation from "../schema/student.schema.joi.validation.js";
import { createNewStudent, forgetPassword, loginUser, resetPassword, updatePassword, updateUserProfile, verifyUserEmail, viewUserProfile } from "../controller/student.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.middleware.js";


let studentRouter = Router();

studentRouter
.route("/") //localhost:8000/student
.post(validation(studentJoiValidation), createNewStudent);

studentRouter
.route("/verify-email") //localhost:8000/student/verify-email
.post(isAuthenticated, verifyUserEmail);

studentRouter
.route("/login") //localhost:8000/student/login
.post(loginUser);

studentRouter
.route("/view-user-profile") //localhost:8000/student/view-user-profile
.get(isAuthenticated, viewUserProfile);

studentRouter
.route("/update-user-profile") //localhost:8000/student/update-user-profile
.patch(isAuthenticated, updateUserProfile);

studentRouter
.route("/update-password") //localhost:8000/student/update-password
.patch(isAuthenticated, updatePassword);

studentRouter
.route("/forget-password") //localhost:8000/student/forget-password
.post(forgetPassword);

studentRouter
.route("/reset-password") //localhost:8000/student/reset-password
.patch(isAuthenticated, resetPassword);

studentRouter
.route("/getSpecificStudent/:id") //localhost:8000/student/getSpecificStudent/:id


export default studentRouter;