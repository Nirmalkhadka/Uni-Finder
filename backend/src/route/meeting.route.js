import { Router } from "express";
import { checkExistingMeeting, doMeetingRequest, fetchMeetingLogs, fetchMeetingLogsForStudent, fetchMeetingRequest, fetchMeetingRequestStudent, rejectMeeting, viewPendingMeetings, viewRejectedMeetings, viewUpcommingMeetings, zoomWebhookHandler } from "../controller/meeting.controller.js";
import { generateZoomMeeting } from "../zoom/zoom.service.js";

let meetingRouter = Router();

meetingRouter
.route("/sendRequest") //localhost:8000/api/meeting/sendRequest
.post(doMeetingRequest)

meetingRouter
.route("/fetchMeetingRequest") //localhost:8000/api/meeting/fetchMeetingRequest
.post(fetchMeetingRequest)

meetingRouter
.route("/fetchMeetingRequestStudent") //localhost:8000/api/meeting/fetchMeetingRequestStudent
.post(fetchMeetingRequestStudent)

meetingRouter
.route("/checkExistingMeeting") //localhost:8000/api/meeting/checkExistingMeeting
.patch(checkExistingMeeting)

meetingRouter
.route("/rejectMeetingRequest") //localhost:8000/api/meeting/rejectMeetingRequest
.patch(rejectMeeting)

meetingRouter
.route("/generateZoomMeetingLink") //localhost:8000/api/meeting/generateZoomMeetingLink
.post(generateZoomMeeting)

meetingRouter
.route("/webhook")
.post(zoomWebhookHandler);

meetingRouter
.route("/fetchPendingRequestsOnly/:requestee") //localhost:8000/api/meeting/fetchPendingRequestsOnly/:requestee
.get(viewPendingMeetings);

meetingRouter
.route("/fetchRejectedRequestsOnly/:requestee") //localhost:8000/api/meeting/fetchRejectedRequestsOnly/:requestee
.get(viewRejectedMeetings);

meetingRouter
.route("/fetchUpcommingRequestsOnly/:requestee") //localhost:8000/api/meeting/fetchUpcommingRequestsOnly/:requestee
.get(viewUpcommingMeetings);

meetingRouter
.route("/fetchMeetingLogs/:requestee") //localhost:8000/api/meeting/fetchMeetingLogs/:requestee
.get(fetchMeetingLogs);

meetingRouter
.route("/fetchMeetingLogsForStudent/:initiator") //localhost:8000/api/meeting/fetchMeetingLogsForStudent/:initiator
.get(fetchMeetingLogsForStudent);





export default meetingRouter; 