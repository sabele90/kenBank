import { Router } from "express";
import {
  getAllCurrencies,
  getCurrencieById,
  createCurrencie,
  updateCurrencie,
  deleteCurrencie,
} from "../controllers/currencieController";

const router = Router();

// Rutas para monedas
router.get("/", getAllCurrencies); 
router.get("/:currencie_id", getCurrencieById); 
router.post("/", createCurrencie); 
router.put("/:currencie_id", updateCurrencie); 
router.delete("/:currencie_id", deleteCurrencie);

export default router;