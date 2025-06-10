import { Box, Avatar, Text, VStack, HStack, Spinner, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import type { User } from "../types/User";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useTransactions } from "../context/TransactionContext";





const ProfileDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { transactions , currency , account ,setSelectedAccountId} = useTransactions();

  // Calcular ingresos totales y retiros
  const totalIncome = transactions.reduce((acc, tx) => {
    const amount = Number(tx.amount); // Asegúrate de que amount sea un número
    return acc + (amount > 0 ? amount : 0);
  }, 0);

  const totalOutcome = transactions.reduce((acc, tx) => {
    const amount = Number(tx.amount); // Asegúrate de que amount sea un número
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
      <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <>
    <Box
      w="100%"
      h="100%"
      p={4}
      borderLeft={"1px solid"}
      borderColor={"gray.300"}
    >
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

      {/* Account Info */}
      <HStack justify="space-between" mb={6}>
        <Text fontWeight="bold" fontSize="lg">
         {currency?.name || ""} account 
        </Text>
        <Text fontWeight="bold" fontSize="lg">
          {account?.balance ? Number(account.balance).toFixed(2) : "0.00"} {currency?.symbol || ""}
        </Text>
      </HStack>

      {/* Cards */}
      <VStack spacing={4} mt={6}>
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
        >
          <HStack>
            <Box bg="purple.500" p={2} borderRadius="full" color="white">
              <FaArrowUp />
            </Box>
            <Text fontWeight="medium">Total Income</Text>
          </HStack>
          <Text fontWeight="bold">{totalIncome.toFixed(2)} {currency?.symbol || ""}</Text>
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
        >
          <HStack>
            <Box bg="red.500" p={2} borderRadius="full" color="white">
              <FaArrowDown />
            </Box>
            <Text fontWeight="medium">Total Outcome</Text>
          </HStack>
          <Text fontWeight="bold">{totalOutcome.toFixed(2)} {currency?.symbol || ""}</Text>
        </Flex>
      </VStack>
      <button onClick={() => setSelectedAccountId(2)}>
    Cambiar a cuenta USD
  </button>
    </Box>

  
  </>
  );
};

export default ProfileDashboard;