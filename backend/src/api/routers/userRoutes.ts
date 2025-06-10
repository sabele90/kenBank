import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,

} from "../controllers/userController";

const router = Router();

// Rutas para usuarios
router.get("/", getAllUsers); 
router.get("/:user_id", getUserById); 
router.post("/", createUser); 
router.put("/:user_id", updateUser); 
router.delete("/:user_id", deleteUser); 

export default router;