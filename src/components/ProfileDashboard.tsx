import {
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import type { User } from "../types/User";
import { useTransactions } from "../context/TransactionContext";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import EuroIcon from "../assets/euro.png";
import KesIcon from "../assets/kes.png";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import { IoMdAdd } from "react-icons/io";
import { IoAddOutline, IoAddCircleOutline } from "react-icons/io5";
import type { Account } from "../types/Account";
import AddTransaction from "./modals/AddTransaction";
interface ProfileDashboardProps {
  setFilterType: React.Dispatch<React.SetStateAction<"all" | "income" | "outcome">>;
  filterType: "all" | "income" | "outcome";
}

const ProfileDashboard = ({ setFilterType }: ProfileDashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transactions, account, accounts, setSelectedAccountId } = useTransactions();

  const totalIncome = transactions.reduce((acc, tx) => acc + (Number(tx.amount) > 0 ? Number(tx.amount) : 0), 0);
  const totalOutcome = transactions.reduce((acc, tx) => acc + (Number(tx.amount) < 0 ? Math.abs(Number(tx.amount)) : 0), 0);

  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case "EUR": return EuroIcon;
      case "KES": return KesIcon;
      default: return "";
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(1);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
    <div className="border-l border-gray-300 dark:border-gray-600 w-full h-full p-4 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        {/* User Info */}
        <div className="flex justify-between mb-4 mt-6 w-full">
          <div className="flex items-center space-x-4">
            <img
              className="w-10 h-10 rounded-lg"
              src={user?.avatarUrl || "./avatar.png"}
              alt="Avatar"
            />
            <div className="flex flex-col">
              <span className="font-bold">{user?.name || "User Name"}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "Email not available"}</span>
            </div>
          </div>
          <div className="p-4">
            <DarkModeSwitcher />
          </div>
        </div>
  
        {/* Currency & Account Selector */}
        <div className="flex items-center mb-4 gap-2">
          {account?.currency?.code && (
            <img className="w-10" src={getCurrencyIcon(account.currency.code)} />
          )}
          <select
            className="font-bold text-lg bg-transparent outline-none border-none"
            value={account?.id}
            onChange={(e) => setSelectedAccountId(Number(e.target.value))}
          >
            {accounts.map((acc: Account) => (
              <option key={acc.id} value={acc.id}>
                {acc.currency?.name} account
              </option>
            ))}
          </select>
        </div>
  
        {/* Cards */}
        <div className="flex flex-col gap-4 mt-6">
          <div
            onClick={() => setFilterType("all")}
            className="w-full p-6 rounded-xl cursor-pointer backdrop-blur-md bg-white/20 hover:bg-white/30 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 transition-all duration-300 shadow-md flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <CiMoneyCheck1 className="text-xl" />
              <span className="font-medium text-gray-800 dark:text-gray-100">Balance</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              {account?.balance ? Number(account.balance).toFixed(2) : "0.00"} {account?.currency?.symbol || ""}
            </span>
          </div>
  
          <div
            className="w-full p-6 rounded-lg shadow-md flex justify-between items-center bg-purple-100 dark:bg-purple-700 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800"
            onClick={() => setFilterType("income")}
          >
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-100">
              <BiSolidUpArrow />
              <span className="font-medium">Income</span>
            </div>
            <span className="font-bold">
              {totalIncome.toFixed(2)} {account?.currency?.symbol || ""}
            </span>
          </div>
  
          <div
            className="w-full p-6 rounded-lg shadow-md flex justify-between items-center bg-red-100 dark:bg-red-700 cursor-pointer hover:bg-red-200 dark:hover:bg-red-800"
            onClick={() => setFilterType("outcome")}
          >
            <div className="flex items-center gap-2 text-red-500 dark:text-red-100">
              <BiSolidDownArrow />
              <span>Outcome</span>
            </div>
            <span className="font-bold">
              {totalOutcome.toFixed(2)} {account?.currency?.symbol || ""}
            </span>
          </div>
        </div>
      </div>
  
      {/* importar csv aqui */}
      {/* <div className="ml-8 mr-8 mb-4">
        <button
            onClick={onOpen}
          className="w-full p-3 rounded-lg shadow-md flex justify-start items-center bg-blue-500 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white gap-3"
        >
          <IoMdAdd className="text-2xl" />
        
          <span>Add transaction</span>
        </button>
      </div> */}

      <div className="ml-8 mr-8 mb-8">
        <button
            onClick={onOpen}
          className="w-full p-3 rounded-lg shadow-md flex justify-start items-center bg-blue-500 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white gap-3"
        >
          <IoMdAdd className="text-2xl" />
        
          <span>Add transaction</span>
        </button>
      </div>
    </div>
      <AddTransaction isOpen={isOpen} onClose={onClose} />
      </>
  );
  
};

export default ProfileDashboard;