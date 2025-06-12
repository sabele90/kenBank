import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Spinner,
  Flex,
  Select
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import type { User } from "../types/User";
import { useTransactions } from "../context/TransactionContext";
import { BiSolidUpArrow } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { BiSolidDownArrow } from "react-icons/bi";
import type { Account } from "../types/Account";

interface ProfileDashboardProps {
  setFilterType: React.Dispatch<
    React.SetStateAction<"all" | "income" | "outcome">
  >;
  filterType: "all" | "income" | "outcome";
}

const ProfileDashboard = ({
  setFilterType,
  filterType,
}: ProfileDashboardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { transactions, account,accounts, setSelectedAccountId } =
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
        <HStack justify="flex-start" mb={4} mt={6}>
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
        <Select
  placeholder="Select account"
  value={account?.id}
  onChange={(e) => setSelectedAccountId(Number(e.target.value))}
>
  {accounts.map((acc: Account) => (
    <option key={acc.id} value={acc.id}>
       Cuenta {acc.id}
    </option>
  ))}
</Select>
        {/* Account Info */}
        <HStack justify="space-between" mb={6}>
          <Text fontWeight="bold" fontSize="lg">
          {account?.currency?.name || ""} account
          </Text>
        </HStack>

        {/* Cards */}
        <VStack spacing={4} mt={6}>
          <Flex
            w="100%"
            bg={filterType === "all" ? "gray.200" : "gray.100"}
            _dark={{ bg: filterType === "all" ? "gray.600" : "gray.700" }}
            p={4}
            borderRadius="lg"
            align="center"
            justify="space-between"
            shadow="md"
            cursor="pointer"
            onClick={() => setFilterType("all")}
          >
            <HStack>
              <Box>
                <CiMoneyCheck1 />
              </Box>
              <Box color="white"></Box>
              <Text fontWeight="medium">Balance</Text>
            </HStack>

            <Text fontWeight="bold">
              {account?.balance ? Number(account.balance).toFixed(2) : "0.00"}{" "}
              {account?.currency?.symbol || ""}
            </Text>
          </Flex>
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
              <Box color="purple">
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
              <Box color="red">
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
