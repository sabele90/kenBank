import React, { forwardRef } from "react";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";
import type { Transaction } from "../types/Transaction";
import { useTransactions } from "../context/TransactionContext";
import { uploadTransactions } from "../services/transactionService";
import { matchCategoryId } from "../components/modals/AddTransaction";
import { useToast } from "@chakra-ui/react";

const CsvImport = forwardRef<HTMLInputElement>((_, ref) => {
  const toast = useToast();
  const { fetchTransactions } = useTransactions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Transaction>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<Transaction>) => {
        try {
          const transactions = results.data.map((row: Transaction) => ({
            description: row.description || "No description",
            amount: row.amount ? Number(row.amount) : 0,
            account_id: row.account_id || 1,
            category_id: matchCategoryId(row.description || "Other"),
            created_at: row.created_at || new Date().toISOString(),
            transfer_id: row.transfer_id || null,
          }));

          await uploadTransactions(transactions);
          await fetchTransactions();

          toast({
            title: "Import successful",
            description: "Transactions imported successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
         
          });
        } catch (error) {
          console.error("Import error:", error);
          toast({
            title: "Import failed",
            description: "There was an error importing the transactions.",
            status: "error",
            duration: 5000,
            isClosable: true,
        
          });
        }
      },
    });
  };

  return (
    <input
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      ref={ref}
      hidden
    />
  );
});

export default CsvImport;
