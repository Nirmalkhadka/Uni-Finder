import mongoose from "mongoose";
import { myURL } from "../constraints.js";

const connectToMongoDb = ()=>{
    mongoose.connect(myURL);
    console.log("Database connected !");
}

export default connectToMongoDb;