import expressAsyncHandler from "express-async-handler";
import StudentSchema from "../schema/student.schema.js";
import ConsultantSchema from "../schema/consultant.schema.js";
import { secretKey } from "../constraints.js";
import { sendEmail } from "../utils/sendingEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const forgotPassword = expressAsyncHandler(async (req, res, next) => {
    const registeredEmail = req.body.registeredEmail;

    let result1 = await StudentSchema.findOne({ email: registeredEmail });

    if (result1 === null) {
        let result2 = await ConsultantSchema.findOne({ email: registeredEmail });
        if (result2 === null) {
            res.status(200).json({
                success: false,
                message: "Email not registered !"
            });
        }
        else {
            let info = {
                id: result2._id
            };
            let expiryInfo = {
                expiresIn: "365d"
            };
            let token = jwt.sign(info, secretKey, expiryInfo);

            sendEmail({
                to: registeredEmail,
                subject: "Password Reset Link !",
                html: `Click on this link to reset your password: <a href="https://uni-finder-liart.vercel.app/password/reset-password?token=${token}">https://uni-finder-liart.vercel.app/password/reset-password?token=${token}</a>`
            });

            res.status(201).json({
                success: true,
                message: "A password reset link has been sent to your email.",
                token: token
            });
        }
    }
    else {
        let info = {
            id: result1._id
        };
        let expiryInfo = {
            expiresIn: "365d"
        };
        let token = jwt.sign(info, secretKey, expiryInfo);

        sendEmail({
            to: registeredEmail,
            subject: "Password Reset Link !",
            html: `Click on this link to reset your password: <a href="https://uni-finder-liart.vercel.app/password/reset-password?token=${token}">https://uni-finder-liart.vercel.app/password/reset-password?token=${token}</a>`
        });

        res.status(201).json({
            success: true,
            message: "A password reset link has been sent to your email.",
            token: token
        });
    }
});

export const resetPassword2 = expressAsyncHandler(async (req, res, next) => {
    let newPassword = req.body.newPassword;
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    let result1 = await StudentSchema.findByIdAndUpdate(req.id, { password: hashedPassword }, { new: true });

    if (result1 === null) {
        let result2 = await ConsultantSchema.findByIdAndUpdate(req.id, { password: hashedPassword }, { new: true });
        if (result2 === null) {
            res.status(200).json({
                success: false,
                message: "Password could not be reset !"
            });
        }
        else {
            res.status(201).json({
                success: true,
                message: "Password reset done successfully !"
            });
        }
    }
    else {
        res.status(201).json({
            success: true,
            message: "Password reset done successfully !"
        });
    }
});

export const validatePassword = expressAsyncHandler(async (req, res, next) => {
    let newPassword = req.body.newPassword;
    let validPasswordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    let isValidPassword = newPassword.match(validPasswordPattern);
    if (isValidPassword) {
        return res.status(200).json({
            success: true,
            message: "Password is valid."
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Password must contain 8-12 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number and at least 1 special character !!"
        });
    }
});