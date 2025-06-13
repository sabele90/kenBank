import { createContext, useContext, useEffect, useState } from "react";
import { getTransactionsByAccountId } from "../services/transactionService";
import type { Transaction } from "../types/Transaction";
import type { Account } from "../types/Account";
import type { Currencie } from "../types/Currencie";
import { useCallback } from "react";
import { getAccountsByUserId } from "../services/accountService"; 

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: (append?: boolean) => Promise<void>;
  account: Account | null;
  accounts: Account[];
  setAccount: (account: Account | null) => void;
  currency: Currencie | null;
  setSelectedAccountId: (id: number) => void;
  loadMoreTransactions: () => void;
  fetchAccountsByUser: (userId: number) => Promise<void>;
  hasMore: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1); // por defecto 1
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currency, setCurrency] = useState<Currencie | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchAccounts = useCallback(async () => {
    try {
      const data = await getAccountsByUserId(1); // usuario 1 por ahora
      console.log("sara", data);
      setAccounts(data);
    } catch (error) {
      console.error("Failed to fetch user accounts", error);
    }
  }, []);
  const fetchAccountsByUser = useCallback(async (userId: number) => {
    try {
      const res = await getAccountsByUserId(userId);
      setAccounts(res);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
    }
  }, []);
  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getTransactionsByAccountId(selectedAccountId, 0);
      setTransactions(data);
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

  useEffect(() => {
    const selected =
      accounts.find((acc) => acc.id === selectedAccountId) || null;
    setAccount(selected);
    setCurrency(selected?.currency || null);
  }, [accounts, selectedAccountId]);

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
  }, [fetchAccounts, fetchTransactions, selectedAccountId]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        fetchTransactions,
        account,
        currency,
        setSelectedAccountId,
        loadMoreTransactions,
        hasMore,
        setAccount,
        accounts,
        fetchAccountsByUser,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
