import jwt from "jsonwebtoken";
import { secretKey } from "../constraints.js";

let isAuthenticated = (req, res, next) => {
    let bearerToken = req.headers.authorization;
    let token = bearerToken.split(" ")[1];
    
    //verify the token
    let info = jwt.verify(token, secretKey);

    req.id = info.id;
    next();
}
export default isAuthenticated;