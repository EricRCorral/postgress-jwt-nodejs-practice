import { NextFunction, Request, Response, Router } from "express";
import { verify } from "jsonwebtoken";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const ROUTER = Router();

const JWT_SECRET = process.env.JWT_SECRET!;

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  try {
    verify(token, JWT_SECRET, () => {
      next();
    });
  } catch (err) {
    res.status(403).json({
      message: `You do not have access to this resource because ${err}`,
    });
    return;
  }
};

ROUTER.get("/", authenticateToken, getAllUsers);
ROUTER.get("/:id", authenticateToken, getUserById);
ROUTER.put("/:id", authenticateToken, updateUser);
ROUTER.delete("/:id", authenticateToken, deleteUser);

export default ROUTER;
