import expressAsyncHandler from "express-async-handler";
import MeetingSchema from "../schema/meeting.schema.js";
import fetch from "node-fetch";
import base64 from "base-64";
import { generateZoomAccessToken } from "../zoom/zoom.service.js";
import MeetingLog from "../schema/meetinglog.schema.js";
// import meetinglogSchema from "../schema/meetinglog.schema.js";


export const doMeetingRequest = expressAsyncHandler(async (req, res, next) => {
    let data = req.body;
    data = {
        ...data,
        meetingStatus: "pending"
    };
    let result = await MeetingSchema.create(data);

    res.status(201).json({
        status: true,
        message: "Meeting Request Made Successfully !",
        result: result
    });
})

export const fetchMeetingRequest = expressAsyncHandler(async (req, res, next) => {
    // const requesteeFirstName = req.body.requesteeFirstName;
    const requesteeEmail = req.body.requesteeEmail;

    let result = await MeetingSchema.find({ requestee: requesteeEmail });

    if (result.length === 0) {
        return res.status(404).json({
            status: false,
            message: "No meetings found for the specified user.",
            result: []
        });
    } else {
        res.status(200).json({
            status: true,
            message: "Meeting request fetched successfully !",
            result: result
        });
    }
})

export const fetchMeetingRequestStudent = expressAsyncHandler(async (req, res, next) => {
    const initiator = req.body.initiator;

    let result = await MeetingSchema.find({ initiator: initiator });

    if (result.length === 0) {
        return res.status(404).json({
            status: false,
            message: "No meetings found for the specified user.",
            result: []
        });
    } else {
        res.status(200).json({
            status: true,
            message: "Meeting request fetched successfully !",
            result: result
        });
    }
})







export const checkExistingMeeting = expressAsyncHandler(async (req, res, next) => {
    const initiator = req.body.initiator;
    const requestee = req.body.requestee;
    const meetingDate = req.body.meetingDate;
    const meetingTime = req.body.meetingTime;
    // const meetingStatus = req.body.status;

    console.log(initiator);
    console.log(requestee);
    console.log(meetingDate);
    console.log(meetingTime);


    let result1 = await MeetingSchema.findOne({ requestee: requestee, meetingDate: meetingDate, meetingTime: meetingTime });
    console.log(result1);
    if (!result1) {
        return res.status(404).json({
            success: false,
            message: "No meeting request found for the specified criteria."
        });
    }
    else {
        if (result1.meetingStatus === "accepted") {
            return res.status(409).json({
                success: false,
                message: "Schedule is Pack. Can't be accepted !"
            });
        }
        else if (result1.meetingStatus === "rejected") {
            return res.status(409).json({
                success: false,
                message: "Meeting has already been Rejected. Can't be confirmed back !"
            });
        }
        else {

            const zoomAccountId = "6S2UWxtuQ52oiJmW9ayQfA";
            const zoomClientId = "xOmR2jZFRoqFR_KZs5nHJA";
            const zoomClientSecret = "MOW3GLJv5UcF9d1WQEab04EVufZ4yeT4";

            let joinURL = "";
            let startURL = "";
            let meetingPassword = "";
            let meetingID = "";

            const start_time = new Date(`${meetingDate}T${meetingTime}:00`).toISOString();

            const zoomAccessToken = await generateZoomAccessToken();
            const response = await fetch(
                `https://api.zoom.us/v2/users/me/meetings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${zoomAccessToken}`
                    },
                    body: JSON.stringify({
                        agenda: "Abroad Study Consultation",
                        default_password: false,
                        duration: 60,
                        password: "unifinder",
                        // schedule_for: "pushpa527sangroula@gmail.com",
                        settings: {
                            allow_multiple_devices: true,
                            breakout_rooms: {
                                enable: true,
                                rooms: [
                                    {
                                        name: "room1",
                                        participants: [
                                            initiator, requestee
                                        ]
                                    }

                                ]
                            },
                            calendar_type: 1,
                            contact_email: initiator,
                            // contact_name: "Pushpa Raj",
                            email_notification: true,
                            encryption_type: 'enhanced_encryption',
                            focus_mode: true,
                            // global_dial_in_countries: ['US'],
                            host_video: true,
                            join_before_host: true,
                            meeting_authentication: true,
                            mute_upon_entry: true,
                            participant_video: true,
                            private_meeting: true,
                            waiting_room: false,
                            watermark: false,
                            continuous_meeting_chat: {
                                enable: true
                            }
                        },
                        start_time: start_time,
                        timezone: 'Asia/Kathmandu',
                        topic: 'Abroad Study Consultation',
                        type: 2
                    }),
                }
            );

            const jsonResponse = await response.json();
            if (!response.ok) {
                return res.status(400).json(
                    {
                        success: false,
                        message: jsonResponse
                    });
            } else {

                joinURL = jsonResponse.join_url;
                startURL = jsonResponse.start_url;
                meetingPassword = jsonResponse.password;
                meetingID = jsonResponse.id;
            }

            let result2 = await MeetingSchema.findOneAndUpdate({ initiator: initiator, requestee: requestee, meetingDate: meetingDate, meetingTime: meetingTime, meetingStatus: "pending" }, { meetingStatus: "accepted", meetingLink: joinURL, meetingID: meetingID }, { new: true });
            return res.status(200).json({
                success: true,
                message: "Meeting Request Accepted Successfully ! ",
                result: result2
            });
        }
    }
})













export const rejectMeeting = expressAsyncHandler(async (req, res, next) => {
    let initiator = req.body.initiator;
    let requestee = req.body.requestee;
    let selectedDate = req.body.selectedDate;
    let selectedTime = req.body.selectedTime;
    let status = req.body.status;

    let result = await MeetingSchema.findOne({ initiator: initiator, requestee: requestee, meetingDate: selectedDate, meetingTime: selectedTime });

    if (!result) {
        res.status(404).json({
            success: false,
            message: "Meeting Request Not Found !"
        });
    } else {
        if (result.meetingStatus === "rejected") {
            res.status(200).json({
                success: false,
                message: "Meeting Request has already been Rejected !"
            });
        }
        else if (result.meetingStatus === "accepted") {
            let result = await MeetingSchema.findOneAndUpdate(
                {
                    initiator,
                    requestee,
                    meetingDate: selectedDate,
                    meetingTime: selectedTime,
                    meetingStatus: "accepted"
                },
                {
                    $set: { meetingStatus: "rejected" },
                    $unset: { meetingLink: "", meetingID: "" }
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "Meeting Request Rejected Successfully",
                result: result
            });
        }
        else {
            let result = await MeetingSchema.findOneAndUpdate({ initiator: initiator, requestee: requestee, meetingDate: selectedDate, meetingTime: selectedTime, meetingStatus: status }, { meetingStatus: "rejected" }, { new: true });
            res.status(200).json({
                success: true,
                message: "Meeting Request Rejected Successfully",
                result: result
            });
        }
    }
})




// This endpoint will receive POST requests from Zoom
export const zoomWebhookHandler = async (req, res) => {
    try {
        console.log('Received Zoom webhook:', req.body); // ADD THIS!
        const event = req.body.event;
        const payload = req.body.payload || req.body; // Sometimes Zoom wraps data in payload

        // Use event to decide what to do
        if (event === "meeting.started") {
            // Save start info, or upsert by meetingId
            await MeetingLog.findOneAndUpdate(
                { meetingID: payload.object.id },
                {
                    meetingID: payload.object.id,
                    topic: payload.object.topic,
                    startTime: payload.object.start_time,
                    rawPayload: payload,
                },
                { upsert: true, new: true }
            );
        }

        if (event === "meeting.ended") {
            // Update log with end time and duration
            await MeetingLog.findOneAndUpdate(
                { meetingID: payload.object.id },
                {
                    endTime: payload.object.end_time,
                    duration: payload.object.duration,
                }
            );
        }

        if (event === "meeting.participant_joined") {
            // Add participant join event
            await MeetingLog.findOneAndUpdate(
                { meetingID: payload.object.id },
                {
                    $push: {
                        participants: {
                            userId: payload.object.participant.user_id,
                            userName: payload.object.participant.user_name,
                            email: payload.object.participant.email,
                            joinTime: payload.object.participant.join_time,
                        }
                    }
                },
                { upsert: true }
            );
        }

        if (event === "meeting.participant_left") {
            // Update participant leave event (find and update in array)
            await MeetingLog.findOneAndUpdate(
                {
                    meetingID: payload.object.id,
                    "participants.userId": payload.object.participant.user_id
                },
                {
                    $set: {
                        "participants.$.leaveTime": payload.object.participant.leave_time,
                        "participants.$.duration": payload.object.participant.duration
                    }
                }
            );
        }

        res.status(200).json({ received: true });
    } catch (err) {
        console.error("Webhook processing error:", err);
        res.status(500).json({ success: false });
    }
};
 

export const viewPendingMeetings = expressAsyncHandler(async (req, res) => {

    // const requestee = req.body.requestee;
    const requestee = req.params.requestee;

    let result = await MeetingSchema.find({ requestee: requestee, meetingStatus: "pending" });
    // console.log(result1); 

    const presentDate = new Date();

    const upcomingPendingMeetings = result.filter(meeting => {
        const { meetingDate, meetingTime } = meeting;
        const onlyDate = meetingDate.toISOString().split('T')[0];
        console.log(onlyDate);

        // As format is: "YYYY-MM-DD" and "HH:mm"
        const combinedDateTime = new Date(`${onlyDate}T${meetingTime}:00`);

        return combinedDateTime > presentDate;
    });

    if (upcomingPendingMeetings.length === 0) {

        res.status(200).json({
            success: false,
            message: "No Pending Requests Found !"
        });

    }
    else {
        res.status(200).json({
            success: true,
            message: "Upcomming Pending request for the desired requestee found successfully !",
            result: upcomingPendingMeetings
        });
    }
});


export const viewRejectedMeetings = expressAsyncHandler(async (req, res, next) => {
    // const requestee = req.body.requestee;
    const requestee = req.params.requestee;

    let result = await MeetingSchema.find({ requestee: requestee, meetingStatus: "rejected" });
    // console.log(result1); 

    if (result.length === 0) {
        res.status(200).json({
            success: false,
            message: "No Rejected Meetings Found !"
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: "Rejected Meetings for the desired requestee found successfully !",
            result: result
        });
    }
})

export const viewUpcommingMeetings = expressAsyncHandler(async (req, res) => {

    // const requestee = req.body.requestee;

    const requestee = req.params.requestee;

    let result = await MeetingSchema.find({ requestee: requestee, meetingStatus: "accepted" });
    // console.log(result1); 

    const presentDate = new Date();

    const upcomingPendingMeetings = result.filter(meeting => {
        const { meetingDate, meetingTime } = meeting;
        const onlyDate = meetingDate.toISOString().split('T')[0];
        console.log(onlyDate);

        // As format is: "YYYY-MM-DD" and "HH:mm"
        const combinedDateTime = new Date(`${onlyDate}T${meetingTime}:00`);

        return combinedDateTime > presentDate;
    });

    if (upcomingPendingMeetings.length === 0) {

        res.status(200).json({
            success: false,
            message: "No Upcomming Meetings Found !"
        });

    }
    else {
        res.status(200).json({
            success: true,
            message: "Upcomming Meetings for the desired requestee found successfully !",
            result: upcomingPendingMeetings
        });
    }
});


export const fetchMeetingLogs = expressAsyncHandler(async (req, res) => {
    const requestee = req.params.requestee;

    // 1. Get all accepted meetings
    const meetings = await MeetingSchema.find({ requestee: requestee, meetingStatus: "accepted" });
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


export const fetchMeetingLogsForStudent = expressAsyncHandler(async (req, res) => {
    const initiator = req.params.initiator;

    // 1. Get all accepted meetings
    const meetings = await MeetingSchema.find({ initiator: initiator, meetingStatus: "accepted" });
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


