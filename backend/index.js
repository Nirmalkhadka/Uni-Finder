import express, { json } from "express";
import { listenApp, portNumber } from "./src/constraints.js";
import errorHandler from "./src/middleware/error.middleware.js";
import cors from "cors";
import studentRouter from "./src/route/student.route.js";
import fileRouter from "./src/route/fileRoute.js";
import consultantRouter from "./src/route/consultant.route.js";
import meetingRouter from "./src/route/meeting.route.js";
import passwordRouter from "./src/route/password.route.js";
import adminRouter from "./src/route/admin.route.js";
// import cookieSession from "cookie-session";
// import passport from "passport";

let app = express();

app.use(cors());

app.use(express.static("./public"));

app.use(json());

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["somesessionkey"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());


app.listen(portNumber, listenApp);

// app.use("/election", electionRouter);

app.use("/student", studentRouter);
app.use("/consultant", consultantRouter);
app.use("/file", fileRouter); 

app.use("/api/meeting", meetingRouter);

app.use("/password", passwordRouter); 

app.use("/admin", adminRouter); 



app.use(errorHandler);