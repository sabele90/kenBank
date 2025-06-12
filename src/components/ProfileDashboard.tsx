import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Spinner,
  Flex,
  Select,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import type { User } from "../types/User";
import { useTransactions } from "../context/TransactionContext";
import { BiSolidUpArrow } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { BiSolidDownArrow } from "react-icons/bi";
import type { Account } from "../types/Account";
import EuroIcon from "../assets/euro.png";
import KesIcon from "../assets/kes.png";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
interface ProfileDashboardProps {
  setFilterType: React.Dispatch<
    React.SetStateAction<"all" | "income" | "outcome">
  >;
  filterType: "all" | "income" | "outcome";
}

const ProfileDashboard = ({ setFilterType }: ProfileDashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { transactions, account, accounts, setSelectedAccountId } =
    useTransactions();

  // Calcular ingresos totales y retiros
  const totalIncome = transactions.reduce((acc, tx) => {
    const amount = Number(tx.amount);
    return acc + (amount > 0 ? amount : 0);
  }, 0);

  const totalOutcome = transactions.reduce((acc, tx) => {
    const amount = Number(tx.amount);
    return acc + (amount < 0 ? Math.abs(amount) : 0);
  }, 0);

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
        console.log("User data fetched:", userData);
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
      <Box
        w="100%"
        h="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <>
      <Box className="border-l border-gray-300 dark:border-gray-600 w-full h-full p-4">
        {/* User Info */}
        <HStack justify="space-between" mb={4} mt={6} w="100%">
          {/* Izquierda: Avatar + Info */}
          <HStack>
            <Avatar
              size="md"
              name={user?.name || "Avatar Image"}
              src={user?.avatarUrl || "./avatar.png"}
              borderRadius="lg"
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{user?.name || "User Name"}</Text>
              <Text fontSize="xs" color="gray.500 dark:gray-400">
                {user?.email || "Email not available"}
              </Text>
            </VStack>
          </HStack>

          {/* Derecha: Switcher */}
          <VStack p={4}>
            <DarkModeSwitcher />
          </VStack>
        </HStack>

        <div className="flex  items-center mb-4 ">
          {account?.currency?.code && (
            <HStack>
              <Image
                className="w-10"
                src={getCurrencyIcon(account.currency.code)}
              />
            </HStack>
          )}

          <Select
            border="none"
            boxShadow="none"
            focusBorderColor="transparent"
            value={account?.id}
            fontWeight={"bold"}
            fontSize={"lg"}
            onChange={(e) => setSelectedAccountId(Number(e.target.value))}
          >
            {accounts.map((acc: Account) => (
              <option key={acc.id} value={acc.id}>
                {acc.currency?.name} account
              </option>
            ))}
          </Select>
        </div>
        {/* Cards */}
        <VStack spacing={4} mt={6}>
          <div
            onClick={() => setFilterType("all")}
            className="w-full p-4 rounded-xl cursor-pointer 
             backdrop-blur-md 
             bg-white/20 hover:bg-white/30 
             dark:bg-slate-800/30 dark:hover:bg-slate-800/50 
             transition-all duration-300 shadow-md flex justify-between items-center"
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

          {/* Income Card */}
          <Flex
            w="100%"
            bg="purple.100"
            _dark={{ bg: "purple.700" }}
            p={4}
            borderRadius="lg"
            align="center"
            justify="space-between"
            shadow="md"
            onClick={() => setFilterType("income")}
          >
            <HStack>
              <Box color="purple" _dark={{ color: "purple.100" }}>
                <BiSolidUpArrow />
              </Box>
              <Text fontWeight="medium">Income</Text>
            </HStack>
            <Text fontWeight="bold">
              {totalIncome.toFixed(2)} {account?.currency?.symbol || ""}
            </Text>
          </Flex>

          {/* Outcome Card */}
          <Flex
            w="100%"
            bg="red.100"
            _dark={{ bg: "red.700" }}
            p={4}
            borderRadius="lg"
            align="center"
            justify="space-between"
            shadow="md"
            onClick={() => setFilterType("outcome")}
          >
            <HStack>
              <Box color="red.500" _dark={{ color: "red.100" }}>
                <BiSolidDownArrow />
              </Box>
              <Text className=""> Outcome</Text>
            </HStack>
            <Text fontWeight="bold">
              {totalOutcome.toFixed(2)} {account?.currency?.symbol || ""}
            </Text>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default ProfileDashboard;
