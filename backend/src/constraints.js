import { config } from "dotenv";
import connectToMongoDb from "./connection/setUpConnection.js";
import { generateZoomMeeting } from "./zoom/zoom.service.js";
// import { generateZoomAccessToken } from "./zoom/zoom.service.js";

config();

export const portNumber = process.env.PORT;
export const myURL = process.env.URL;
export const secretKey = process.env.SECRET_KEY;

export const listenApp = ()=>{
    console.log(`Application is listening on port ${portNumber}`);
    connectToMongoDb();
    // generateZoomAccessToken();  do not include this line number 15
    // generateZoomMeeting();  
}