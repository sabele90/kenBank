import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    useToast,
  } from "@chakra-ui/react";
  import { deleteTransaction } from "../../services/transactionService";
  import { useTransactions } from "../../context/TransactionContext";
  
  interface DeleteTransactionProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: number; // ID de la transacción a eliminar
  }
  
  const DeleteTransactionDialog = ({
    isOpen,
    onClose,
    transactionId,
  }: DeleteTransactionProps) => {
    const { fetchTransactions } = useTransactions(); // Accede al contexto para actualizar las transacciones
    const toast = useToast();
  
    const handleDelete = async () => {
      try {
        await deleteTransaction(transactionId); // Elimina la transacción
        await fetchTransactions(); // Actualiza las transacciones
        toast({
          title: "Transaction deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose(); // Cierra el modal
      } catch (error) {
        toast({
          title: "Error deleting transaction",
          description: (error as Error).message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default DeleteTransactionDialog;