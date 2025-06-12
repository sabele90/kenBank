import axios from "axios";
import type { User } from "../types/User";

const API_URL = "http://localhost:3000/api/users";

// GET: Obtener todos los usuarios
export const getAllUsers = async () => {
  const res = await axios.get<User[]>(API_URL);
  return res.data;
};
// GET: Obtener un usuario por ID
export const getUserById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// POST: Crear un nuevo usuario
export const createUser = async (data: User) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// PUT: Actualizar un usuario por ID
export const updateUser = async (id: number, data: User) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// DELETE: Eliminar un usuario por ID
export const deleteUser = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};