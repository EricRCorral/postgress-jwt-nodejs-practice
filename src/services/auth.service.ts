import { sign } from "jsonwebtoken";
import User from "../models/user.interface";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = ({ id, email }: User): string =>
  sign({ id, email }, JWT_SECRET, { expiresIn: "1h" });

export default generateToken;
