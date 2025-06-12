import { Box, Flex, Text, VStack, Avatar, Spinner } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { categories } from "../constants/categories";
import { useTransactions } from "../context/TransactionContext";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import DeleteTransactionDialog from "./modals/DeleteTransaction";
import EditTransaction from "./modals/EditTransaction";

const TransactionList = ({
  searchTerm,
  filterType = "all",
  sortOrder,
  dateRange, 
}: {
  searchTerm: string;
  filterType?: "all" | "income" | "outcome";
  sortOrder: "asc" | "desc";
  dateRange?: Date[];


}) => {
  const { transactions, loading, loadMoreTransactions, hasMore } =
    useTransactions();
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);


  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  if (loading) return 
  <div className="bg-black">
  <Spinner />
  </div>;


  // Filtrar y ordenar
  const filteredTransactions = transactions
    .filter((tx) =>
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((tx) => {
      if (filterType === "income") return tx.amount > 0;
      if (filterType === "outcome") return tx.amount < 0;
      return true;
    })
    .filter((tx) => {
      if (!dateRange || dateRange.length < 2) return true;
      
      const txDate = new Date(tx.createdAt);
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      
      // Normalizar fechas para comparar solo días
      txDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      
      return txDate >= startDate && txDate <= endDate;
    })
    

  const sortedTransactions = [...filteredTransactions].sort((a, b) =>
    sortOrder === "desc"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Handlers
  const handleDeleteClick = (id: number) => {
    setSelectedTransactionId(id);
    onDeleteOpen();
  };

  const handleEditClick = (id: number) => {
    setSelectedTransactionId(id);
    onEditOpen();
  };

  return (
    <>
     

      <Box
        h="100%"
        p={4}
        pb={100}
        overflowY="auto"
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
       <VStack align="stretch" spacing={3}>
  {sortedTransactions.length === 0 ? (
    <Flex justify="center" align="center" p={10}>
      <Text fontSize="md" color="gray.500">
        No transactions found
      </Text>
    </Flex>
  ) : (
          sortedTransactions.map((tx) => {
            const keyword = tx.description?.toLowerCase() || "";
            const matchedCategory =
              categories.find((cat) =>
                cat.keywords.some((kw) => keyword.includes(kw))
              ) || categories.find((cat) => cat.name === "Other");

            return (
              <Flex
                key={tx.id}
                className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl p-3 relative z-[1] items-center gap-4"
              >
                <Flex flexBasis="30%" align="center" gap={3}>
                  <Avatar
                    bg={`${matchedCategory?.color}.200`}
                    icon={matchedCategory?.icon}
                    size="sm"
                  />
                  <Text
                    className="text-gray-500 dark:text-gray-200"
                    fontSize="sm"
                  >
                    {tx.description}
                  </Text>
                </Flex>

                <Box flexBasis="20%">
                  <Text
                    className="text-gray-500 dark:text-gray-200"
                    fontSize="sm"
                  >
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </Text>
                </Box>

                <Box flexBasis="20%">
                  <Text
                    className="text-gray-500 dark:text-gray-200"
                    fontSize="sm"
                  >
                    {new Date(tx.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Box>

                <Box flexBasis="20%">
                  <Text
                    fontSize="sm"
                    color={tx.amount < 0 ? "red.500" : "green.500"}
                    fontWeight="medium"
                  >
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </Text>
                </Box>

                <Flex flexBasis="auto" ml="auto" gap={2}>
                  <button
                    className="p-2 rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300 transition"
                    aria-label="Edit"
                    onClick={() => handleEditClick(tx.id!)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="p-2 rounded-md text-gray-500 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition"
                    aria-label="Delete"
                    onClick={() => handleDeleteClick(tx.id!)}
                  >
                    <FiTrash2 />
                  </button>
                </Flex>
              </Flex>
            );
          })
        )}
        </VStack>
        <div className="flex justify-center text-center p-10">
          { sortedTransactions.length > 0 && hasMore && (
            <button
              className=" p-2 rounded-md text-gray-500 hover:text-blue-500 transition"
              onClick={loadMoreTransactions}
            >
              Cargar más transacciones
            </button>
          )}
        </div>
      </Box>

      {/* Modales */}
      {selectedTransactionId && (
        <>
          <EditTransaction
            isOpen={isEditOpen}
            onClose={onEditClose}
            transactionId={selectedTransactionId}
          />
          <DeleteTransactionDialog
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            transactionId={selectedTransactionId}
          />
        </>
      )}
    </>
  );
};

export default TransactionList;
