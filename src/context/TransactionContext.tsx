import { createContext, useContext, useEffect, useState } from "react";
import { getTransactionsByAccountId } from "../services/transactionService"
import type { Transaction } from "../types/Transaction";
import { getAccountById } from "../services/accountService";
import type { Account } from "../types/Account";
import { getCurrencieById } from "../services/currencieService";
import type { Currencie } from "../types/Currencie";
import { useCallback } from "react";


interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: (append?: boolean) => Promise<void>; 
  account: Account | null;
  setAccount: (account: Account | null) => void; 
  currency: Currencie | null;
  setSelectedAccountId: (id: number) => void;
  loadMoreTransactions: () => void; 
  fetchAccountAndCurrency: () => Promise<void>;   
  hasMore: boolean;                  
}


const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1); // por defecto 1

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState<Account | null>(null);
    const [currency, setCurrency] = useState<Currencie | null>(null);
    const [offset, setOffset] = useState(0);
const [hasMore, setHasMore] = useState(true);


const fetchTransactions = useCallback(async () => {
    try {
      const data = await getTransactionsByAccountId(selectedAccountId, 0);
      setTransactions(data)
        setOffset(20); 
      setHasMore(data.length === 20);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedAccountId]);
  const loadMoreTransactions = useCallback(async () => {
    try {
      const data = await getTransactionsByAccountId(selectedAccountId, offset);
      setTransactions((prev) => [...prev, ...data]); 
      setOffset((prev) => prev + 20);
      setHasMore(data.length === 20);
    } catch (err) {
      console.error("Failed to load more transactions:", err);
    }
  }, [selectedAccountId, offset]);

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
    setOffset(0); // reiniciar si se cambia de cuenta
    setTransactions([]); //reiniicar las cuentas
    fetchAccountAndCurrency();//apunta a la cuenta y me trae la moneda
    fetchTransactions();
  }, [selectedAccountId, fetchAccountAndCurrency, fetchTransactions]);
  
 
  

  return (
    <TransactionContext.Provider value={{ transactions, loading, fetchTransactions , account, currency ,setSelectedAccountId, loadMoreTransactions,    hasMore, setAccount, fetchAccountAndCurrency }}>
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
