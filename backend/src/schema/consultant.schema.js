import { model, Schema } from "mongoose";

let consultantSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }, 
    universityName: {
        type: String, 
        required: true
    },
    major: {
        type: String, 
        required: true
    },
    courseName: {
        type: String, 
        required: true
    }, 
    country: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    profileImage: {
        type: String, 
        required: true
    }, 
    universityNameNormalized: {
        type: String
    }, 
    isVerifiedEmail: {
        type: Boolean
    }
});

let ConsultantSchema = model("ConsultantSchema", consultantSchema);
export default ConsultantSchema;