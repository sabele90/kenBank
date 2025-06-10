import { createContext, useContext, useEffect, useState } from "react";
import { getAllTransactions } from "../services/transactionService";
import type { Transaction } from "../types/Transaction";
import { getAccountById } from "../services/accountService";
import type { Account } from "../types/Account";
import { getCurrencieById } from "../services/currencieService";
import type { Currencie } from "../types/Currencie";
import { useCallback } from "react";


interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  account: Account | null;
  currency: Currencie | null;
  setSelectedAccountId : (id:number) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1); // por defecto 1

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<Account | null>(null);
    const [currency, setCurrency] = useState<Currencie | null>(null);
  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAccountAndCurrency = useCallback(async () => {
    try {
      const accountData = await getAccountById(selectedAccountId);
      setAccount(accountData);
  
      if (accountData.currency_id) {
        const currencyData = await getCurrencieById(accountData.currency_id);
        setCurrency(currencyData);
      }
    } catch (error) {
      console.error("Error fetching account or currency:", error);
    }
  }, [selectedAccountId]);
  useEffect(() => {
    fetchTransactions();
    fetchAccountAndCurrency();
  }, [selectedAccountId, fetchAccountAndCurrency]);
  

  return (
    <TransactionContext.Provider value={{ transactions, loading, fetchTransactions , account, currency ,setSelectedAccountId}}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
