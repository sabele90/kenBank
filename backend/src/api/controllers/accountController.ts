import { Request, Response } from "express";
import Account from "../models/Account";
import Currencie from "../models/Currencie";

// GET
export const getAllAccounts =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getAccountById =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { account_id } = req.params;
    const account = await Account.findByPk(account_id);
    if (!account) {
      res.status(404).send("Not found");
      return;
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export const getAccountsByUserId =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { user_id } = req.params;
    const accounts = await Account.findAll({
      where: { user_id },
      include: [{ model: Currencie, as: "currency" }],
    });

    if (!accounts.length) {
      res.status(404).json({ message: "No accounts found for this user" });
      return;
    }
    res.status(200).json(accounts.map(account => account.toJSON()));

  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// POST
export const createAccount =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// PUT
export const updateAccount =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { account_id } = req.params;
    const [updated] = await Account.update(req.body, {
      where: { id: account_id },
    });
    
    if (!updated) {
      res.status(404).send("Not found");
      return;
    }
    
    const updatedAccount = await Account.findByPk(account_id);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// DELETE
export const deleteAccount =  async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { account_id } = req.params;
    const deleted = await Account.destroy({ where: { id: account_id } });
    
    if (!deleted) {
      res.status(404).send("Not found");
      return;
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};