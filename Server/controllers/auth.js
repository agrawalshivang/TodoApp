import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const secret = "This is secret";
export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    ...req.body,
    password: hashed,
  });
  await user.save();
  res.json({ success: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({ success: false, error: "No account with this email exists" });
  } else {
    const result = await bcrypt.compare(password, user.password);
    if (result === false) {
      res.json({ success: false, error: "Invalid password" });
    } else {
        const token=jwt.sign({id:user._id},secret,{expiresIn:3*24*60*60*1000})
        res.json({success:true,token:token})
    }
  }
};
