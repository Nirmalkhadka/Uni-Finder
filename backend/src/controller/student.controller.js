import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import StudentSchema from "../schema/student.schema.js";
import { secretKey } from "../constraints.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendingEmail.js";
import ConsultantSchema from "../schema/consultant.schema.js";

export const createNewStudent = expressAsyncHandler(async (req, res, next) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    data = {
        ...data,
        isVerifiedEmail: false
    };

    let checkExistingEmail1 = await StudentSchema.findOne({ email: data.email });
    if (checkExistingEmail1) {
        res.status(409).json({
            success: false,
            message: "Email Already Used !"
        });
    }
    else {
        let checkExistingEmail2 = await ConsultantSchema.findOne({ email: data.email });
        if (checkExistingEmail2) {
            res.status(409).json({
                success: false,
                message: "Email Already Used !"
            });
        }
        else {
            let result = await StudentSchema.create(data);

            //preparing token
            let info = {
                id: result._id
            };

            let expiryInfo = {
                expiresIn: "365d"
            };

            //generating token
            let token = jwt.sign(info, secretKey, expiryInfo);

            //sending verification email
            sendEmail({
                to: req.body.email,
                subject: "Email Verification",
                html: `Click on this link to verify your email: <a href="https://uni-finder-liart.vercel.app/verify-email?token=${token}">https://uni-finder-liart.vercel.app/verify-email?token=${token}</a>`
            });

            res.status(201).json({
                success: true,
                message: "Verification Link is sent to your Email. Please Verify !!",
                token: token
            });
        }
    }
});

export const verifyUserEmail = expressAsyncHandler(async (req, res, next) => {
    let result = await StudentSchema.findByIdAndUpdate(req.id, { isVerifiedEmail: true }, { new: true });
    res.status(200).json({
        success: true,
        message: "Email verified successfully !",
        result: result
    });
});

export const loginUser = expressAsyncHandler(async (req, res, next) => {
    let result = await StudentSchema.findOne({ email: req.body.email });
    if (result === null) {
        res.status(401).json({
            success: false,
            message: "Invalid Credentials !"
        });
    }
    else if (result.isVerifiedEmail === false) {
        res.status(401).json({
            success: false,
            message: "Please verify your email first !"
        });
    }
    else {
        let isValidPassword = await bcrypt.compare(req.body.password, result.password);
        if (isValidPassword) {
            let info = {
                id: result._id
            };
            let expiryInfo = {
                expiresIn: "365d"
            };
            let token = jwt.sign(info, secretKey, expiryInfo);
            res.status(200).json({
                success: true,
                message: "Login Success !",
                token: token,
                result: result
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: "Invalid Credentials !"
            });
        }
    }
});

export const viewUserProfile = expressAsyncHandler(async (req, res, next) => {
    let result = await StudentSchema.findById(req.id);
    res.status(200).json({
        success: true,
        message: "User Fetched Successfully !",
        result: result
    });
});

export const updateUserProfile = expressAsyncHandler(async (req, res, next) => {
    let result = await StudentSchema.findByIdAndUpdate(req.id, req.body, { new: true });
    res.status(201).json({
        success: true,
        message: "User Updated Successfully !",
        result: result
    });
});

export const updatePassword = expressAsyncHandler(async (req, res, next) => {
    let oldPassword = req.body.oldPassword;
    let newPassword = await bcrypt.hash(req.body.newPassword, 10);
    let result = await StudentSchema.findById(req.id);
    let isValidPassword = await bcrypt.compare(oldPassword, result.password);
    if (isValidPassword) {
        let result = await StudentSchema.findByIdAndUpdate(req.id, { password: newPassword }, { new: true });
        res.status(201).json({
            success: true,
            message: "Password Updated Successfully !",
            result: result
        });
    }
    else {
        let error = new Error("Invalid Old Password !!!");
        error.status = 401;
        throw error;
    }
});

export const forgetPassword = expressAsyncHandler(async (req, res, next) => {
    let result = await StudentSchema.findOne({ email: req.body.email });
    if (result === null) {
        let error = new Error("Email not found/registered !!!");
        error.status = 401;
        throw error;
    }
    else {
        let info = {
            id: result._id
        };
        let expiryInfo = {
            expiresIn: "365d"
        };
        let token = jwt.sign(info, secretKey, expiryInfo);

        sendEmail({
            to: req.body.email,
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

export const resetPassword = expressAsyncHandler(async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let result = await StudentSchema.findByIdAndUpdate(req.id, { password: req.body.password }, { new: true });
    res.status(201).json({
        success: true,
        message: "Password reset done successfully !"
    });
});

export const handleSingleFileController = expressAsyncHandler(async (req, res, next) => {
    let fileInfo = req.file;
    let link = `https://uni-finder-liart.vercel.app/${req.file.filename}`;
    res.status(200).json({
        success: true,
        message: "File uploaded successfully !",
        result: link
    });
});