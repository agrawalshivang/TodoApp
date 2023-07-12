import express from "express";
import db from "./db.js";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";
import bodyParser from "body-parser";
const app = express();
db();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://shivang-todo.netlify.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use("/auth", authRouter);
app.use("", todoRouter);

app.listen(5000, () => {
  console.log("Server started");
});
