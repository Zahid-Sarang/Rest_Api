import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";

const app = express();

// Data base connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json());

// routes
app.use("/api", routes);

app.use(errorHandler); // middelware
app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
