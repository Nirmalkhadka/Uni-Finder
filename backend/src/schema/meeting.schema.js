import { model, Schema } from "mongoose";

let meetingSchema = new Schema({
    initiator: {
        type: String, 
    }, 
    initiatorImage: {
        type: String,
    }, 
    initiatorFullName: {
        type: String, 
    }, 
    initiatorCountry: {
        type: String
    }, 
    initiatorAOI: {
        type: String, 
    }, 
    requestee: {
        type: String, 
    }, 
    requesteeFullName: {
        type: String, 
    }, 
    requesteeImage: {
        type: String,
    }, 
    meetingDate: {
        type: Date
    }, 
    meetingTime: {
        type: String
    }, 
    meetingStatus: {
        type: String
    }, 
    meetingLink: {
        type: String
    }, 
    meetingID: {
        type: String
    }
});

let MeetingSchema = model("MeetingSchema", meetingSchema); 
export default MeetingSchema; 