import React, { forwardRef } from "react";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";
import type { Transaction } from "../types/Transaction";
import { useTransactions } from "../context/TransactionContext";
import { uploadTransactions } from "../services/transactionService";
import { matchCategoryId } from "../components/modals/AddTransaction";

const CsvImport = forwardRef<HTMLInputElement>((_, ref) => {
  const { fetchTransactions } = useTransactions(); // Mueve el hook al nivel superior del componente

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Transaction>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<Transaction>) => {
        try {
          const transactions = results.data.map((row : Transaction) => ({
            description: row.description || "No description", // Valor predeterminado si falta la descripción
            amount: row.amount ? Number(row.amount) : 0, // Valor predeterminado si falta el monto
            account_id: row.account_id || 1, // Valor predeterminado para account_id
            category_id: matchCategoryId(row.description || "Other"), // Asigna category_id dinámicamente
            createdAt: row.createdAt || new Date().toISOString(), // Fecha predeterminada si no está presente
            transfer_id: row.transfer_id || null, // Valor predeterminado para transfer_id
          }));

          await uploadTransactions(transactions);
          await fetchTransactions();
          alert("Transacciones importadas correctamente.");
        } catch (error) {
          console.error("Error al importar:", error);
          alert("Error al importar.");
        }
      },
    });
  };

  return (
    <input
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      ref={ref} // Asigna la referencia al input
      hidden
    />
  );
});

export default CsvImport;