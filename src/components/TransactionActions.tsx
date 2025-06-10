import { 
  HStack, 
  IconButton, 
  Tooltip, 
  useDisclosure, 
  useColorModeValue 
} from "@chakra-ui/react";
import { TbCsv } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import AddTransaction from "./modals/AddTransaction";
import CsvImport from "../utils/csvImport";
import { useRef } from "react";



const TransactionActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Color mode values
  const buttonBg = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("gray.500", "gray.400");
  const hoverBg = useColorModeValue("gray.300", "gray.600");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <HStack spacing={3}>
        <Tooltip label="Import from CSV" hasArrow>
          <IconButton
            aria-label="Import from CSV"
            icon={<TbCsv />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg }}
            onClick={() => fileInputRef.current?.click()}
          />
        </Tooltip>

        <Tooltip label="Add transaction manually" hasArrow>
          <IconButton
            aria-label="Add transaction manually"
            icon={<IoAddOutline />}
            bg={buttonBg}
            size="md"
            borderRadius="full"
            variant="outline"
            color={buttonColor}
            _hover={{ bg: hoverBg }}
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>

      <AddTransaction
        isOpen={isOpen}
        onClose={onClose}

      />

<CsvImport ref={fileInputRef} />
    </>
  );
};

export default TransactionActions;