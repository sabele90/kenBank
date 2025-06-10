import axios from "axios";
import type { Currencie } from "../types/Currencie";

const API_URL = "http://localhost:3000/api/currencies";

// GET
export const getAllCurrencies = async () => {
  const res = await axios.get<Currencie[]>(API_URL);
  return res.data;
};

export const getCurrencieById = async (id_currencie: number) => {
  const res = await axios.get(`${API_URL}/${id_currencie}`);
  return res.data;
};

// POST
export const createCurrencie = async (data: Currencie) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// PUT
export const updateCurrencie = async (id_currencie: number, data: Currencie) => {
  const res = await axios.put(`${API_URL}/${id_currencie}`, data);
  return res.data;
};

// DELETE
export const deleteCurrencie = async (id_currencie: number) => {
  const res = await axios.delete(`${API_URL}/${id_currencie}`);
  return res.data;
};