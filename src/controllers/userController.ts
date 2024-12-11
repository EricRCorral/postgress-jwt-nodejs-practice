import { Request, Response } from "express";
import prisma from "../models/user";
import { hashPassword } from "../services/password.service";

export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ID = Number(req.params.id);
    const USER = await prisma.findUnique({ where: { id: ID } });

    if (!USER) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(USER);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ID = Number(req.params.id);
    const { email, password } = req.body;
    let updatedUser: any = {};

    if (!!email) updatedUser.email = email;

    if (!!password) {
      const HASHED_PASSWORD = await hashPassword(password);
      updatedUser.password = HASHED_PASSWORD;
    }

    const USER = await prisma.update({ data: updatedUser, where: { id: ID } });

    if (!USER) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(USER);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ID = Number(req.params.id);
  try {
    await prisma.delete({ where: { id: ID } });
    res
      .status(202)
      .json({ message: `User with ID: ${ID} was deleted` })
      .end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
