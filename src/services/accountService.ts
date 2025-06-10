import axios from "axios";
import type { Account } from "../types/Account";

const API_URL = "http://localhost:3000/api/accounts";

// GET
export const getAllAccounts = async () => {
  const res = await axios.get<Account[]>(API_URL);
  return res.data;
};
export const getAccountById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
export const getAccountsByUserId = async (userId: number) => {
  const res = await axios.get<Account[]>(`${API_URL}/user/${userId}`);
  return res.data;
};
// POST
export const createAccount = async (data: Account) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// PUT
export const updateAccount = async (id: number, data: Account) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// DELETE
export const deleteAccount = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};