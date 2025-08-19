import Joi from "joi";

let consultantJoiValidation = Joi.object().keys({
    firstName: Joi.string().required().min(2).max(30).messages({
        "any.required": "firstName is required",
        "string.base": "firstName should be a string",
        "string.min": "firstName should be at least 2 characters long",
        "string.max": "firstName can be at most 30 characters long"
    }),

    lastName: Joi.string().required().min(3).max(30).messages({
        "any.required": "lastName is required",
        "string.base": "lastName should be a string",
        "string.min": "lastName should be at least 3 characters long",
        "string.max": "lastName can be at most 30 characters long"
    }),

    universityName: Joi.string().required().min(2).max(50).messages({
        "any.required": "universityName is required",
        "string.base": "universityName should be a string",
        "string.min": "universityName should be at least 2 characters long",
        "string.max": "universityName can be at most 50 characters long"
    }),

    major: Joi.string().required().min(2).max(50).messages({
        "any.required": "major is required",
        "string.base": "major should be a string"
    }),

    courseName: Joi.string().required().min(2).max(50).messages({
        "any.required": "courseName is required",
        "string.base": "courseName should be a string",
        "string.min": "courseName should be at least 2 characters long",
        "string.max": "courseName can be at most 50 characters long"
    }),

    country: Joi.string(), 

    email: Joi.string().required()
        .custom((value, msg) => {
            let validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let isValidEmail = value.match(validEmailPattern);
            if (isValidEmail) {
                return value;
            }
            else {
                return msg.message("Invalid Email Pattern !");
            }
        }).messages({
            "any.required": "email is required",
            "string.base": "email should be a string"
        }),

    password: Joi.string().required()
        .custom((value, msg) => {
            let validPasswordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
            let isValidPassword = value.match(validPasswordPattern);
            if (isValidPassword) {
                return true;
            }
            else {
                return msg.message("Password must contain 8-12 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number and at least 1 special character !!");
            }
        }).messages({
            "any.required": "password is required",
            "string.base": "password should be a string"
        }),

    profileImage: Joi.string().required().messages({
        "any.required": "profileImage is required",
    }),
    // Password must contain 8-12 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number and at least 1 special character

    universityNameNormalized: Joi.string(),
    
    isVerifiedEmail: Joi.boolean()

}).unknown(false);

export default consultantJoiValidation;