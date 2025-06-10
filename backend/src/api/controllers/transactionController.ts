import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

export const getAllTransactions = async (req: Request, res: Response) => {
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

export const getOneTransaction = async (req: Request, res: Response) => {
  const { transaction_id } = req.params;
  const transaction = await Transaction.findByPk(transaction_id);
  if (!transaction)  res.status(404).send("Not found");
  res.status(200).json(transaction);
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};
//INSERTAR VARIAS TRANSACCIONES
export const uploadTransactions = async (req: Request, res: Response) => {
  try {
    const newTransactions = await Transaction.bulkCreate(req.body);
    res.status(201).json(newTransactions);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { transaction_id } = req.params;
  const [updated] = await Transaction.update(req.body, {
    where: { id: transaction_id },
  });
  if (!updated)  res.status(404).send("Not found");
  const updatedTransaction = await Transaction.findByPk(transaction_id);
  res.status(200).json(updatedTransaction);
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { transaction_id } = req.params;
  const deleted = await Transaction.destroy({ where: { id: transaction_id } });
  if (!deleted)  res.status(404).send("Not found");
  res.status(204).send();
};
