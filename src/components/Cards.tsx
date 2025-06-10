
import { useTransactions } from "../context/TransactionContext";

const Cards = () => {
  const { account, currency } = useTransactions();
  
  const balance = account?.balance ? Number(account.balance) : 0; // Convertir balance a número
  
  return (
    <div className="flex flex-wrap justify-center gap-6 p-10">
      {/* Tarjeta 1 - Modo claro */}
      <div
        className="hidden dark:block min-w-[280px] max-w-[280px] h-[160px] rounded-xl bg-cover bg-center shadow-lg 
        hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        style={{
          backgroundImage: `url('./darkCardVisa.png')`,
        }}
      ></div>

      {/* Tarjeta 1 - Modo oscuro */}
      <div
        className="block dark:hidden min-w-[280px] max-w-[280px] h-[160px] rounded-xl bg-cover bg-center shadow-lg 
        hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        style={{
          backgroundImage: `url('./cardVisa.png')`,
        }}
      ></div>

      {/* Tarjeta 2 - Modo claro */}
      <div
        className="hidden dark:block min-w-[280px] max-w-[280px] h-[160px] rounded-xl bg-cover bg-center shadow-lg 
        hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between p-4 text-white"
        style={{
          backgroundImage: `url('./darkCardVisa2.png')`,
        }}
      >
        <div>
          <p className="text-lg font-bold">{account?.number || "Loading..."}</p>
        </div>
        <div>
          <p className="text-sm">Balance</p>
          <p className="text-lg font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Tarjeta 2 - Modo oscuro */}
      <div
        className="block dark:hidden min-w-[280px] max-w-[280px] h-[160px] rounded-xl bg-cover bg-center shadow-lg 
        hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between p-4 text-black"
        style={{
          backgroundImage: `url('./cardVisaWhite.png')`,
        }}
      >
        <div className="flex justify-center pt-6">
  
          <p className="text-md ">{account?.number || "Loading..."}</p>
        </div>
        <div>
          <p className="text-sm">Balance</p>
          <p className="text-lg font-bold">
            {balance.toFixed(2)} {currency?.symbol || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;