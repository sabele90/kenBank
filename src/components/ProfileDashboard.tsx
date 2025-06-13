import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { getUserById } from "../services/userService";
import { convertEurToKes } from "../services/transactionService";
import type { User } from "../types/User";
import { useTransactions } from "../context/TransactionContext";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import EuroIcon from "../assets/euro.png";
import KesIcon from "../assets/kes.png";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import { IoMdAdd } from "react-icons/io";
import type { Account } from "../types/Account";
import AddTransaction from "./modals/AddTransaction";
import { CiImport } from "react-icons/ci";
import CsvImport from "../utils/CsvImport";
import { BsCurrencyExchange } from "react-icons/bs";

import { useToast } from "@chakra-ui/react";

interface ProfileDashboardProps {
  setFilterType: React.Dispatch<
    React.SetStateAction<"all" | "income" | "outcome">
  >;
  filterType: "all" | "income" | "outcome";
}

const ProfileDashboard = ({ setFilterType }: ProfileDashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConvertOpen,
    onOpen: onConvertOpen,
    onClose: onConvertClose,
  } = useDisclosure();
  const {
    transactions,
    account,
    accounts,
    setSelectedAccountId,
    fetchAccountsByUser,
    fetchTransactions,
  } = useTransactions();
  const [convertAmount, setConvertAmount] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalIncome = transactions.reduce(
    (acc, tx) => acc + (Number(tx.amount) > 0 ? Number(tx.amount) : 0),
    0
  );
  const totalOutcome = transactions.reduce(
    (acc, tx) =>
      acc + (Number(tx.amount) < 0 ? Math.abs(Number(tx.amount)) : 0),
    0
  );
  const toast = useToast();
  const handleConvertFromEur = async (eur_amount: number) => {
    if (!accounts || !account) return;

    const eurAccount = accounts.find((acc) => acc.currency?.code === "EUR");

    if (!eurAccount) {
      toast({
        title: "No EUR account found",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await convertEurToKes({
        eur_account_id: eurAccount.id!,
        kes_account_id: account.id!,
        eur_amount,
      });

      toast({
        title: "Conversion successful",
        description: `You received ${result.amountInKes.toFixed(2)} KES`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      if (user?.id !== undefined) {
        await fetchAccountsByUser(user.id);
      }
      await fetchTransactions();
      if (account?.id !== undefined) {
        setSelectedAccountId(account.id);
      }
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "Check your balance or try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case "EUR":
        return EuroIcon;
      case "KES":
        return KesIcon;
      default:
        return "";
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
      <div className="border-l border-gray-300  dark:border-gray-600 w-full h-full p-4 flex flex-col">
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
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "Email not available"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <DarkModeSwitcher />
            </div>
          </div>

          {/* Currency & Account Selector */}
          <div className="flex items-center mb-4 gap-2">
            {account?.currency?.code && (
              <img
                className="w-10"
                src={getCurrencyIcon(account.currency.code)}
              />
            )}
            <select
              className="font-bold text-lg bg-transparent hover:bg-gray-300  dark:hover:bg-white/20 rounded-xl outline-none border-none w-full  p-4"
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
              className="w-full p-6 rounded-xl cursor-pointer  bg-white/10 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 shadow-md flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <CiMoneyCheck1 className="text-xl" />
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  Balance
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                {account?.balance ? Number(account.balance).toFixed(2) : "0.00"}{" "}
                {account?.currency?.symbol || ""}
              </span>
            </div>

            <div
              className="w-full p-6 rounded-lg shadow-md flex justify-between items-center bg-purple-300/20 dark:bg-purple-400/20 backdrop-blur-md cursor-pointer hover:bg-purple-300/60 dark:hover:bg-purple-400/30 transition-all"
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
              className="w-full p-6 rounded-lg shadow-md flex justify-between items-center bg-red-300/40 dark:bg-red-400/20 backdrop-blur-md cursor-pointer hover:bg-red-300/60 dark:hover:bg-red-400/30 transition-all"
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
        {account?.currency?.code === "KES" && (
          <div className="ml-8 mr-8 mb-4">
            <button
              onClick={onConvertOpen}
              className="w-full p-3 rounded-lg shadow-md flex justify-start items-center bg-green-300/40 hover:bg-green-400/60  dark:text-white   text-black gap-3"
            >
              <BsCurrencyExchange />
              <span>Convert from EUR</span>
            </button>
          </div>
        )}

        <div className="ml-8 mr-8 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3 rounded-lg shadow-md flex justify-start items-center bg-white/40  dark:bg-blue-300/10 hover:bg-gray-200 dark:hover:bg-blue-300/20 dark:text-white text-gray-700 gap-3"
          >
            <CiImport className="text-2xl" />

            <span>Import CSV</span>
          </button>
        </div>

        <div className="ml-8 mr-8 mb-8">
          <button
            onClick={onOpen}
            className="w-full p-3 rounded-lg shadow-md  bg-white/40 dark:bg-blue-300/10 hover:bg-gray-200 dark:hover:bg-blue-300/20 dark:text-white text-gray-700 flex justify-start items-center gap-3 transition-all"
          >
            <IoMdAdd className="text-2xl" />
            <span>Add transaction</span>
          </button>
        </div>
      </div>
      <AddTransaction isOpen={isOpen} onClose={onClose} />
      <CsvImport ref={fileInputRef} />
      <Modal
        isOpen={isConvertOpen}
        onClose={onConvertClose}
        isCentered
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Convert EUR to KES</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Amount in EUR</FormLabel>
              <Input
                type="number"
                placeholder="Enter EUR amount"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onConvertClose} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                const amount = Number(convertAmount);
                if (isNaN(amount) || amount <= 0) {
                  toast({
                    title: "Invalid amount",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                  });
                  return;
                }

                await handleConvertFromEur(amount);
                onConvertClose();
                setConvertAmount("");
              }}
            >
              Convert
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileDashboard;
