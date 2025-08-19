import { model, Schema } from "mongoose";

const MeetingLogSchema = new Schema({
    meetingID: { 
        type: String, 
        required: true 
    }, // Zoom meeting id
    topic: String,
    startTime: Date,      // When the meeting actually started
    endTime: Date,        // When the meeting actually ended
    duration: Number,     // Actual duration in minutes
    participants: [
        {
            userId: String,
            userName: String,
            email: String,
            joinTime: Date,
            leaveTime: Date,
            duration: Number   // Minutes in meeting
        }
    ],
    rawPayload: Object    // (optional) store the full webhook payload
});

let MeetingLog = model("MeetingLog", MeetingLogSchema); 

export default MeetingLog; 
