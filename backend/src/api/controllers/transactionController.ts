import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Account } from "../models/Account";
import { Currencie} from '../models/Currencie';

export const getAllTransactions =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const transactions = await Transaction.findAll({
      limit: 20, 
      order: [['createdAt', 'DESC']], 
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
export const getTransactionsByAccountId =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { account_id, offset = 0, limit = 20 } = req.query;

    const where = account_id ? { account_id } : undefined;

    const transactions = await Transaction.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};




export const getOneTransaction =  async (req: Request, res: Response): Promise<void> =>  {
  const { transaction_id } = req.params;
  const transaction = await Transaction.findByPk(transaction_id);
  if (!transaction)  res.status(404).send("Not found");
  res.status(200).json(transaction);
};

export const createTransaction =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { description, amount, account_id, category_id, transfer_id } = req.body;

    // Crear la transacción
    const transaction = await Transaction.create({
      description,
      amount,
      account_id,
      category_id,
      transfer_id,
    });

    // Buscar cuenta
    const account = await Account.findByPk(account_id);
    if (!account) {
     res.status(404).json({ message: "Account not found" });
     return;
    }

    // Actualizar el balance
    const currentBalance = Number(account.balance || 0);
    const newBalance = currentBalance + Number(amount); // puede ser negativo o positivo
    account.balance = newBalance;
    await account.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
//INSERTAR VARIAS TRANSACCIONES
export const uploadTransactions =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const newTransactions = await Transaction.bulkCreate(req.body);
    res.status(201).json(newTransactions);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const updateTransaction =  async (req: Request, res: Response): Promise<void> =>  {
  const { transaction_id } = req.params;
  const [updated] = await Transaction.update(req.body, {
    where: { id: transaction_id },
  });
  if (!updated)  res.status(404).send("Not found");
  const updatedTransaction = await Transaction.findByPk(transaction_id);
  res.status(200).json(updatedTransaction);
};

export const deleteTransaction =  async (req: Request, res: Response): Promise<void> =>  {
  const { transaction_id } = req.params;
  const deleted = await Transaction.destroy({ where: { id: transaction_id } });
  if (!deleted)  res.status(404).send("Not found");
  res.status(204).send();
};

export const convertEurToKes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eur_account_id, kes_account_id, eur_amount } = req.body;

    if (!eur_account_id || !kes_account_id || !eur_amount) {
       res.status(400).json({ message: "Missing required fields" });
    }

    // Obtener cuentas con la moneda incluida
    const eurAccount = await Account.findByPk(eur_account_id, {
      include: [{ model: Currencie, as: "currency" }],
    });

    const kesAccount = await Account.findByPk(kes_account_id, {
      include: [{ model: Currencie, as: "currency" }],
    });

    if (!eurAccount || !kesAccount) {
       res.status(404).json({ message: "Account not found" });
       return
    }

    const eurBalance = Number(eurAccount.balance || 0);
    if (eurBalance < eur_amount) {
      res.status(400).json({ message: "Insufficient EUR balance" });
      return
    }

    const kesRate = kesAccount.currency?.rate_to_eur;
    if (!kesRate || kesRate <= 0) {
     res.status(500).json({ message: "Invalid KES rate" });
    }

    const amountInKes = eur_amount * (1 / Number(kesRate));

    const transferId = `conv-${Date.now()}`;

    // Crear transacción negativa en EUR
    await Transaction.create({
      description: "Currency conversion to KES",
      amount: -eur_amount,
      account_id: eur_account_id,
      category_id: 1,
      transfer_id: transferId,
    });

    // Crear transacción positiva en KES
    await Transaction.create({
      description: "Currency conversion from EUR",
      amount: amountInKes,
      account_id: kes_account_id,
      category_id: 1,
      transfer_id: transferId,
    });

    // Actualizar balances
    eurAccount.balance = eurBalance - eur_amount;
    kesAccount.balance = Number(kesAccount.balance || 0) + amountInKes;

    await eurAccount.save();
    await kesAccount.save();

   res.status(201).json({ message: "Conversion successful", amountInKes });
  } catch (error) {
    console.error("Currency conversion error:", error);
  res.status(500).json({ message: "Internal server error" });
  }
};