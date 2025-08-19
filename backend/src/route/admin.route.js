import { Router } from "express";
import { deleteSpecificConsultant, deleteSpecificStudent, fetchMeetingLogsForAdmin, viewAllConsultants, viewAllStudents } from "../controller/admin.controller.js";

let adminRouter = Router();

adminRouter
.route("/viewAllStudents") //localhost:8000/admin/viewAllStudents
.get(viewAllStudents)

adminRouter
.route("/deleteSpecificStudent/:id") //localhost:8000/admin/deleteSpecificStudent/:id
.delete(deleteSpecificStudent)

adminRouter
.route("/viewAllConsultants") //localhost:8000/admin/viewAllConsultants
.get(viewAllConsultants)

adminRouter
.route("/deleteSpecificConsultant/:id") //localhost:8000/admin/deleteSpecificConsultant/:id
.delete(deleteSpecificConsultant)

adminRouter
.route("/fetchMeetingLogsForAdmin") //localhost:8000/admin/fetchMeetingLogsForAdmin
.get(fetchMeetingLogsForAdmin)

export default adminRouter; 