import {
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { TbCsv } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import AddTransaction from "./modals/AddTransaction";
import CsvImport from "../utils/csvImport";
import { useRef, useState, useEffect } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import type { Dispatch, SetStateAction } from "react";
import type { DatepickerConfigs } from "chakra-dayzed-datepicker";
import { CiExport } from "react-icons/ci";
import { RiResetLeftFill } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

type TransactionActionsProps = {
  onDateRangeChange: Dispatch<SetStateAction<Date[]>>;
  onResetFilterType: Dispatch<SetStateAction<"all" | "income" | "outcome">>;
};

const TransactionActions = ({ onDateRangeChange, onResetFilterType }: TransactionActionsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDateModalOpen, onOpen: onDateModalOpen, onClose: onDateModalClose } = useDisclosure();
  const buttonBg = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("gray.500", "gray.400");
  const hoverBg = useColorModeValue("gray.300", "gray.600");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fechas por defecto: últimos 30 días
  const getDefaultDateRange = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return [thirtyDaysAgo, today];
  };

  const [dateRange, setDateRange] = useState<Date[]>(getDefaultDateRange());

  // Establecer las fechas por defecto al cargar el componente
  useEffect(() => {
    const defaultRange = getDefaultDateRange();
    setDateRange(defaultRange);
    onDateRangeChange(defaultRange);
  }, [onDateRangeChange]);

  const handleDateChange = (range: Date[]) => {
    setDateRange(range);
    onDateRangeChange(range);
    // Cerrar el modal después de seleccionar las fechas
    if (range.length === 2) {
      onDateModalClose();
    }
  };

  const datePickerConfigs: DatepickerConfigs = {
    dateFormat: "dd/MM/yyyy",
    dayNames: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    monthNames: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    firstDayOfWeek: 0,
  };

  return (
    <>
      <HStack spacing={3}>
        <Tooltip label="Seleccionar fechas" hasArrow>
          <IconButton
            aria-label="Calendar"
            icon={<IoCalendarOutline />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg, color: buttonBg }}
            onClick={onDateModalOpen}
          />
        </Tooltip>
      
        <Tooltip label="Reset Data" hasArrow>
          <IconButton
            aria-label="Reset"
            icon={<RiResetLeftFill />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg, color: buttonBg }}
            onClick={() => {
              const defaultRange = getDefaultDateRange();
              setDateRange(defaultRange);
              onDateRangeChange(defaultRange);
              onResetFilterType("all");
            }}
          />
        </Tooltip>

        <Tooltip label="Import CSV" hasArrow>
          <IconButton
            aria-label="Import CSV"
            icon={<TbCsv />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg, color: buttonBg }}
            onClick={() => fileInputRef.current?.click()}
          />
        </Tooltip>

        <Tooltip label="Export CSV" hasArrow>
          <IconButton
            aria-label="Export CSV"
            icon={<CiExport />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg, color: buttonBg }}
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
            _hover={{ bg: hoverBg, color: buttonBg }}
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>

      {/* Modal para el selector de fechas */}
      <Modal isOpen={isDateModalOpen} onClose={onDateModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select dates</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
  <Flex justify="center" align="center" direction="column">
    <RangeDatepicker
      selectedDates={dateRange}
      onDateChange={handleDateChange}
      configs={datePickerConfigs}
    />
  </Flex>
</ModalBody>
        </ModalContent>
      </Modal>

      <AddTransaction isOpen={isOpen} onClose={onClose} />
      <CsvImport ref={fileInputRef} />
    </>
  );
};

export default TransactionActions;