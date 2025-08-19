import { model, Schema } from "mongoose";

let studentSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }, 
    areaOfInterest: {
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
    country: {
        type: String, 
        required: true
    }, 
    profileImage: {
        type: String, 
        required: true
    }, 
    isVerifiedEmail: {
        type: Boolean
    }
});

let StudentSchema = model("StudentSchema", studentSchema);
export default StudentSchema;