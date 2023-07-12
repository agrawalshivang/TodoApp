import User from "../models/user.js";
import jwt from "jsonwebtoken";

const secret = "This is secret";

const validateDetails = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json({
      success: false,
      error: "User with this email id already exists!!",
    });
  } else {
    next();
  }
};

const verifyUser = async (req, res, next) => {
  if (req.body.token) {
    const decode = await jwt.verify(req.body.token, secret);
    if (decode) {
      const user = await User.findById(decode.id);
      res.locals.user = user;
      next();
    } else {
      res.json({ login: false });
    }
  } else {
    res.json({ login: false });
  }
};


export default validateDetails;
export { verifyUser };