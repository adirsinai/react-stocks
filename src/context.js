import React, { useContext, useEffect, useState } from "react";
import { data } from "./utils/StockData";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stocks, setStocks] = useState(data);
  const [filterStocks,setFilterStocks] = useState('')

  const changePostionUp = (stockIndex) => {
    let data = [...stocks];
    let temp = data[stockIndex - 1];
    data[stockIndex - 1] = data[stockIndex];
    data[stockIndex] = temp;

    setStocks(data);
  };

  const changePostionDown = (stockIndex) => {
    let data = [...stocks];
    if (stockIndex === data.length - 1) {
      stockIndex = 1;
    }
    let temp = data[stockIndex + 1];
    data[stockIndex + 1] = data[stockIndex];
    data[stockIndex] = temp;

    setStocks(data);
  };


// useEffect(() => {
  
//   setStocks(stocks.filter((stock) =>
//     stock.Symbol.toLowerCase().includes(filterStocks)
//   ));
// }, [filterStocks]);

  return (
    <AppContext.Provider
      value={{ stocks, changePostionUp, changePostionDown,filterStocks ,setFilterStocks }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
