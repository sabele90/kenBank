import ProfileDashboard from "../components/ProfileDashboard";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import TransactionActions from "../components/TransactionActions";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import {  HStack } from "@chakra-ui/react";
import Cards from "../components/Cards";
import { useState } from "react";
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="h-full w-full bg-white/50 dark:bg-gray-800/50  backdrop-blur-md rounded-r-3xl shadow-md flex overflow-hidden ">
<div className="flex-grow p-6 pr-3 text-gray-800 dark:text-gray-100 h-screen flex flex-col overflow-hidden">


        <HStack justify="flex-end" mb={4}>
          <DarkModeSwitcher />
        </HStack>
        <SearchBar onSearch={setSearchTerm} />

        <Cards/>

        <div className="flex justify-between mb-4 m-2">
          <h1 className="text-2xl font-bold ">Transacctions</h1>
          <TransactionActions />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
        <TransactionList searchTerm={searchTerm} />
  </div>
      </div>

      {/* Parte derecha */}
      <div className="w-[380px] shrink-0">
        <ProfileDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
