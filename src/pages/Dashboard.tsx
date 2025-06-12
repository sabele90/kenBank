import ProfileDashboard from "../components/ProfileDashboard";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import TransactionActions from "../components/TransactionActions";

import { HStack } from "@chakra-ui/react";
import Cards from "../components/Cards";
import { useState } from "react";
import { TbArrowsUpDown } from "react-icons/tb";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "outcome">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateRange, setDateRange] = useState<Date[]>([]);


  return (
    <div className="h-full w-full bg-white/50 dark:bg-gray-800/50  backdrop-blur-md rounded-r-3xl shadow-md flex overflow-hidden ">
      <div className="flex-grow p-6 pr-3 text-gray-800 dark:text-gray-100 h-screen flex flex-col overflow-hidden">
       
        <SearchBar onSearch={setSearchTerm} />

        <Cards />

        <div className="flex justify-between mb-4 m-2">
        <div className="flex justify-center items-center gap-2 text-center">
  <div className="text-2xl font-bold">Transactions</div>
  <button onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}>
    <TbArrowsUpDown />
  </button>
</div>

<TransactionActions onDateRangeChange={setDateRange} onResetFilterType={setFilterType} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <TransactionList searchTerm={searchTerm} filterType={filterType} sortOrder={sortOrder} dateRange={dateRange}/>
        </div>
      </div>

      {/* Parte derecha */}
      <div className="w-[380px] shrink-0">
        <ProfileDashboard
          setFilterType={setFilterType}
          filterType={filterType}
        />
      </div>
    </div>
  );
};

export default Dashboard;
