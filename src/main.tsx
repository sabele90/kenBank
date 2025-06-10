import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { TransactionProvider } from "./context/TransactionContext";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TransactionProvider>
    <ChakraProvider >
      <App />
    </ChakraProvider>
    </TransactionProvider>
  </React.StrictMode>
);