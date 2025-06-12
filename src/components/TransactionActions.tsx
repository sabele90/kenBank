import {
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbCsv } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import AddTransaction from "./modals/AddTransaction";
import CsvImport from "../utils/csvImport";
import { useRef, useState, useEffect } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import type { Dispatch, SetStateAction } from "react";
import type { DatepickerConfigs } from "chakra-dayzed-datepicker";
import { RiResetLeftFill } from "react-icons/ri";
type TransactionActionsProps = {
  onDateRangeChange: Dispatch<SetStateAction<Date[]>>;
  onResetFilterType: Dispatch<SetStateAction<"all" | "income" | "outcome">>;
};

const TransactionActions = ({ onDateRangeChange, onResetFilterType }: TransactionActionsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <RangeDatepicker
          selectedDates={dateRange}
          onDateChange={handleDateChange}
          configs={datePickerConfigs}
        />
          <Tooltip label="Reset Data" hasArrow>
          <IconButton
            aria-label="Reset"
            icon={<RiResetLeftFill />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg , color: buttonBg}}
            onClick={() => {
              const defaultRange = getDefaultDateRange();
              setDateRange(defaultRange);
              onDateRangeChange(defaultRange);
              onResetFilterType("all")
            }}
          />
        </Tooltip>

        <Tooltip label="Import from CSV" hasArrow>
          <IconButton
            aria-label="Import from CSV"
            icon={<TbCsv />}
            size="md"
            bg={buttonBg}
            color={buttonColor}
            borderRadius="full"
            variant="outline"
            _hover={{ bg: hoverBg , color: buttonBg}}
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
            _hover={{ bg: hoverBg , color: buttonBg}}
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>

      <AddTransaction isOpen={isOpen} onClose={onClose} />
      <CsvImport ref={fileInputRef} />
    </>
  );
};

export default TransactionActions;