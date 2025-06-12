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
    Select,
    useToast,
    Spinner,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { getOneTransaction, updateTransaction } from '../../services/transactionService';
  import { categories } from "../../constants/categories";
  import { useTransactions } from "../../context/TransactionContext";
  
  export function matchCategoryId(description: string): number {
    const lowerDesc = description.toLowerCase();
    for (const category of categories) {
      if (category.keywords.some((kw: string) => lowerDesc.includes(kw))) {
        return category.id;
      }
    }
    return 10; // "Other"
  }
  
  interface EditTransactionProps {
    isOpen: boolean;
    onClose: () => void;
    transactionId: number;
  }
  
  const EditTransaction = ({ isOpen, onClose, transactionId }: EditTransactionProps) => {
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"deposit" | "withdrawal">("deposit");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
  
    const { fetchTransactions } = useTransactions();
    const toast = useToast();
  
    // Cargar los datos existentes de la transacción al abrir
    useEffect(() => {
      const loadTransaction = async () => {
        try {
          const data = await getOneTransaction(transactionId);
          setDescription(data.description);
          setType(data.amount >= 0 ? "deposit" : "withdrawal");
          setAmount(Math.abs(data.amount).toString());
        } catch (error) {
          toast({
            title: "Error loading transaction",
            description: (error as Error).message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      };
  
      if (transactionId && isOpen) {
        setLoading(true);
        loadTransaction();
      }
    }, [transactionId, isOpen, toast]);
  
    const handleSubmit = async () => {
      if (!description.trim() || !amount) {
        toast({
          title: "Please fill all fields",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      const signedAmount = type === "deposit" ? Number(amount) : -Number(amount);
      const category_id = matchCategoryId(description);
  
      try {
        await updateTransaction(transactionId, {
          description,
          amount: signedAmount,
          account_id: 1,
          category_id,
          transfer_id: null,
          created_at: new Date().toISOString(),
          id: transactionId,
        });
        await fetchTransactions();
        toast({
          title: "Transaction updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        onClose();
      } catch (error) {
        toast({
          title: "Error updating transaction",
          description: (error as Error).message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalCloseButton />
  
          <ModalBody>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <FormControl mb={4}>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="e.g. Shopping at Zara"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
  
                <FormControl mb={4}>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value as "deposit" | "withdrawal")}
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </Select>
                </FormControl>
  
                <FormControl mb={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
  
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditTransaction;
  