import axios from "axios";
import type { Transaction } from "../types/Transaction";
const API_URL = "http://localhost:3000/api/transactions";
interface CurrencyConversionPayload {
  eur_account_id: number;
  kes_account_id: number;
  eur_amount: number;
}
export const convertEurToKes = async (data: CurrencyConversionPayload) => {
  const res = await axios.post(`${API_URL}/convert_eur`, data);
  return res.data;
};

//GET
export const getAllTransactions = async () => {
    const res = await axios.get<Transaction[]>(API_URL);
    return res.data;
};
export const getTransactionsByAccountId = async (
  accountId: number,
  offset = 0,
  limit = 20
): Promise<Transaction[]> => {
  const res = await axios.get<Transaction[]>(API_URL, {
    params: {
      account_id: accountId,
      offset,
      limit,
    },
  });
  return res.data;
};

export const getOneTransaction = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

//POST
export const createTransaction = async (data: Transaction) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
export const uploadTransactions = async (data: Transaction []) => {
  const res = await axios.post(`${API_URL}/upload`, data);
  return res.data;
};
//PUT
export const updateTransaction = async (id: number, data: Transaction) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};
//DELETE
export const deleteTransaction = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};


