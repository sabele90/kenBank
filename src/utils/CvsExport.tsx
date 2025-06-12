import Papa from "papaparse";
import { useTransactions } from "../context/TransactionContext";

const CsvExport = () => {
  const { transactions } = useTransactions();

  const handleExport = () => {
    if (!transactions || transactions.length === 0) {
      console.warn("No transactions to export.");
      return;
    }

    // Prepara los datos para exportar
    const csvData = transactions.map((tx) => ({
      id: tx.id ?? "",
      description: tx.description ?? "",
      amount: tx.amount ?? 0,
      account_id: tx.account_id ?? "",
      category_id: tx.category_id ?? "",
      created_at: tx.createdAt ?? "", 
      transfer_id: tx.transfer_id ?? "",
    }));

    // lo convierte a csv
    const csv = Papa.unparse(csvData);

    // Crea un archivo descargable
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Crea y simula el clic en un link de descarga
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpia el objeto URL
    URL.revokeObjectURL(url);
  };

  return handleExport;
};

export default CsvExport;
