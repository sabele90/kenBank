import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Account } from "../models/Account";
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
