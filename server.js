import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import path from "path";

const app = express();

//==================== Data base connection ===============//
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to DB"));

//===============  global variable ===============//
global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//=============== routes ===============//
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

//=============== middelware ===============//
app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
