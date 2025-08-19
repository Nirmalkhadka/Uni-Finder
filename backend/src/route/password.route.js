import { Router } from "express";
import { forgotPassword, resetPassword2, validatePassword } from "../controller/password.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.middleware.js";

let passwordRouter = Router();

passwordRouter
.route("/forgot-password") //localhost:8000/password/forgot-password
.post(forgotPassword)

passwordRouter
.route("/reset-password") //localhost:8000/password/reset-password
.patch(isAuthenticated, resetPassword2)

passwordRouter
.route("/validate-password") //localhost:8000/password/validate-password
.post(validatePassword)

export default passwordRouter; 