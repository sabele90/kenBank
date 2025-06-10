import {
  Box,
  Flex,
  Text,
  VStack,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { categories } from "../constants/categories"; 
import { useTransactions } from "../context/TransactionContext";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import DeleteTransactionDialog from "./modals/DeleteTransaction"; 
import EditTransaction from "./modals/EditTransaction";

// Componente principal
const TransactionList = ({ searchTerm }: { searchTerm: string }) => {
  const { transactions, loading } = useTransactions();
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
 
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

  // 1. Si aún se están cargando los datos
  if (loading) return <Spinner />;

  // 2. Filtrar transacciones por descripción
  const filteredTransactions = transactions.filter((tx) =>
    tx.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Abrir modal al borrar
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
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome
        }}
      >
        <VStack align="stretch" spacing={3}>
          {filteredTransactions.map((tx) => {
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
                {/* Concepto */}
                <Flex flexBasis="30%" align="center" gap={3}>
                  <Avatar
                    bg={`${matchedCategory?.color}.200`}
                    icon={matchedCategory?.icon}
                    size="sm"
                  />
                  <Text className="text-gray-500 dark:text-gray-200" fontSize="sm">
                    {tx.description}
                  </Text>
                </Flex>

                {/* Fecha */}
                <Box flexBasis="20%">
                  <Text className="text-gray-500 dark:text-gray-200" fontSize="sm">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </Text>
                </Box>

                {/* Hora */}
                <Box flexBasis="20%">
                  <Text className="text-gray-500 dark:text-gray-200" fontSize="sm">
                    {new Date(tx.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Box>

                {/* Monto */}
                <Box flexBasis="20%">
                  <Text
                    fontSize="sm"
                    color={tx.amount < 0 ? "red.500" : "green.500"}
                    fontWeight="medium"
                  >
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </Text>
                </Box>

                {/* Acciones */}
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
          })}
        </VStack>
        <button
                    className="p-2 rounded-md text-gray-500 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition"
                    aria-label="Load More"
                  //csargar mas 
                  >
                    <FiTrash2 />
                  </button>
     
      </Box>
  {/* Modal de editar */}
 
      {/* Modal de edición */}
      {selectedTransactionId && (
        <EditTransaction
          isOpen={isEditOpen}
          onClose={onEditClose}
          transactionId={selectedTransactionId}
        />
      )}

      {/* Modal de borrado */}
      {selectedTransactionId && (
        <DeleteTransactionDialog
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          transactionId={selectedTransactionId}
        />
      )}
      
    </>
  );
};

export default TransactionList;
