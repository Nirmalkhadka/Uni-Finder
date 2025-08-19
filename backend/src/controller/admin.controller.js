import expressAsyncHandler from "express-async-handler";
import StudentSchema from "../schema/student.schema.js";
import ConsultantSchema from "../schema/consultant.schema.js";
import MeetingLog from "../schema/meetinglog.schema.js";
import MeetingSchema from "../schema/meeting.schema.js";

export const viewAllStudents = expressAsyncHandler(async (req, res, next)=>{
    let result = await StudentSchema.find();
    
    if(result.length===0){
        res.status(200).json({
            success: false, 
            message: "No Students Found !"
        }); 
    }
    else{
        res.status(200).json({
            success: true, 
            message: "Students Fetched Successfully !", 
            result: result
        });
    }
})

export const deleteSpecificStudent = expressAsyncHandler(async (req, res, next)=>{
    let id = req.params.id; 
    let result = await StudentSchema.findByIdAndDelete({_id: id}); 
    if(!result){
        res.status(200).json({
            success: false, 
            message: "Could Not Delete !"
        });
    }else{
        res.status(200).json({
            success: true, 
            message: "Deleted Successfully !"
        });
    }
})

export const viewAllConsultants = expressAsyncHandler(async (req, res, next)=>{
    let result = await ConsultantSchema.find();
    
    if(result.length===0){
        res.status(200).json({
            success: false, 
            message: "No Consultants Found !"
        }); 
    }
    else{
        res.status(200).json({
            success: true, 
            message: "Consultants Fetched Successfully !", 
            result: result
        });
    }
})

export const deleteSpecificConsultant = expressAsyncHandler(async (req, res, next)=>{
    let id = req.params.id; 
    let result = await ConsultantSchema.findByIdAndDelete({_id: id}); 
    if(!result){
        res.status(200).json({
            success: false, 
            message: "Could Not Delete !"
        });
    }else{
        res.status(200).json({
            success: true, 
            message: "Deleted Successfully !"
        });
    }
})

export const fetchMeetingLogsForAdmin = expressAsyncHandler(async (req, res) => {
    // const requestee = req.params.requestee;

    // 1. Get all accepted meetings
    const meetings = await MeetingSchema.find({meetingStatus: "accepted"});
    if (!meetings || meetings.length === 0) {
        return res.status(200).json({
            success: false,
            message: "No Meeting History Found!",
            meetingDetails: [],
            meetingLogs: []
        });
    }

    // 2. Extract meetingIDs
    const meetingIDs = meetings.map(meeting => meeting.meetingID);

    // 3. Get logs for those IDs
    const logs = await MeetingLog.find({ meetingID: { $in: meetingIDs } });

    // 4. Build a Set of meetingIDs that have logs
    const logIDsSet = new Set(logs.map(log => log.meetingID));

    // 5. Filter only those meetings which have logs
    const filteredMeetings = meetings.filter(meeting => logIDsSet.has(meeting.meetingID));

    // 6. Respond with filtered data
    if (filteredMeetings.length === 0) {
        return res.status(200).json({
            success: false,
            message: "No Meeting Logs Found!",
            meetingDetails: [],
            meetingLogs: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Meeting logs found successfully!",
        meetingDetails: filteredMeetings,
        meetingLogs: logs
    });
});