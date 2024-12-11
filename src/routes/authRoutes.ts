import { Router } from "express";
import { login, register } from "../controllers/authController";

const ROUTER = Router();

ROUTER.post("/register", register);
ROUTER.post("/login", login);

export default ROUTER;
