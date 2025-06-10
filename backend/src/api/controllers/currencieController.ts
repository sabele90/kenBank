import { Request, Response } from "express";
import Currencie from "../models/Currencie";

// Obtener todas las monedas
export const getAllCurrencies = async (req: Request, res: Response) => {
  try {
    const currencies = await Currencie.findAll();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

// Obtener una moneda por ID
export const getCurrencieById = async (req: Request, res: Response) => {

    const { currencie_id } = req.params;
    const currencie = await Currencie.findByPk(currencie_id);
    if (!currencie)  res.status(404).send("Not found");
    res.status(200).json(currencie);
  };

// Crear una nueva moneda
export const createCurrencie = async (req: Request, res: Response) => {
  try {
    const newCurrencie = await Currencie.create(req.body);
    res.status(201).json(newCurrencie);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Actualizar una moneda existente
export const updateCurrencie = async (req: Request, res: Response) => {

    const { currencie_id } = req.params;
    const [updated] = await Currencie.update(req.body, {
      where: { currencie_id },
    });
  if (!updated)  res.status(404).send("Not found");
  const updatedTransaction = await Currencie.findByPk(currencie_id);
  res.status(200).json(updatedTransaction);
};


// Eliminar una moneda
export const deleteCurrencie = async (req: Request, res: Response) => {
    const { currencie_id } = req.params;
    const deleted = await Currencie.destroy({ where: { currencie_id } });
    if (!deleted)  res.status(404).send("Not found");
    res.status(204).send();
};