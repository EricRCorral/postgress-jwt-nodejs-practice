import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";


const APP = express();

APP.use(express.json());

APP.use("/auth", authRoutes);
APP.use("/users", userRoutes);

export default APP;
