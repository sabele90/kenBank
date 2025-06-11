import { Router } from "express";
import {

  getOneTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  uploadTransactions,
  getTransactionsByAccountId
} from "../controllers/transactionController";

const router = Router();


router.get("/",getTransactionsByAccountId);
router.get("/:transaction_id", getOneTransaction);
router.post("/", createTransaction);
router.post("/upload", uploadTransactions); 
router.put("/:transaction_id", updateTransaction);
router.delete("/:transaction_id", deleteTransaction);


  
export default router;
