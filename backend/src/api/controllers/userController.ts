import { Request, Response } from "express";
import { User } from "../models/User";


// GET
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};


export const getUserById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user)  res.status(404).send("Not found");
    res.status(200).json(user);
  };
// POST
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, avatarUrl } = req.body;

    const newUser = await User.create({ name, email, phone, avatarUrl });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

//PUT
export const updateUser = async (req: Request, res: Response) => {
   const { user_id } = req.params;
   const [updated] = await User.update(req.body, {
     where: { id: user_id },
   });
   if (!updated)  res.status(404).send("Not found");
   const updatedUser = await User.findByPk(user_id);
   res.status(200).json(updatedUser);
 };

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
   const { user_id } = req.params;
   const deleted = await User.destroy({ where: { id: user_id } });
   if (!deleted)  res.status(404).send("Not found");
   res.status(204).send();
 };
