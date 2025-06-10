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
} from "@chakra-ui/react";
import { useState } from "react";
import { createTransaction } from '../../services/transactionService';
import { categories } from "../../constants/categories";
import { useTransactions } from "../../context/TransactionContext";

export function matchCategoryId(description: string): number {
  const lowerDesc = description.toLowerCase();
 
  for (const category of categories) {
    if (category.keywords.some((kw : string) => lowerDesc.includes(kw))) {
      return category.id;
    }
  }
 
  return 10; // "Other"
}

interface AddTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransaction = ({ isOpen, onClose }: AddTransactionProps) => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"deposit" | "withdrawal">("deposit");
  const [amount, setAmount] = useState("");
  const { fetchTransactions } = useTransactions();
  const toast = useToast();


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
      await createTransaction({
        description,
        amount: signedAmount,
        account_id: 1,
        category_id,
        transfer_id: null,
        createdAt: new Date().toISOString(),
      });
      await fetchTransactions();
      
      toast({
        title: "Transaction added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
        
      // reset form y cerrar modal
      setDescription("");
      setAmount("");
      setType("deposit");
      onClose();
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Error creating transaction",
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
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
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
        </ModalBody>
        
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Transaction
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTransaction;