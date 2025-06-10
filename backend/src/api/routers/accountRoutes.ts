import { Router } from "express";
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountsByUserId
} from "../controllers/accountController";

const router = Router();

// Rutas para cuentas
router.get("/", getAllAccounts); 
router.get("/:account_id", getAccountById); 
router.get("/user/:user_id", getAccountsByUserId);
router.post("/", createAccount); 
router.put("/:account_id", updateAccount); 
router.delete("/:account_id", deleteAccount);

export default router;