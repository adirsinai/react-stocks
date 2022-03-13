import React, { useContext, useEffect, useState } from "react";
import { data } from "./utils/StockData";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stocks, setStocks] = useState(data);
  const [filterStocks, setFilterStocks] = useState("");
  const [hideSortBtn,setHideSortBtn] = useState(true)
   const [editView, setEditView] = useState(false);

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

  const removeStock = (symbol)=>{
const tempList = stocks.filter((stock)=> stock.Symbol !== symbol)
setStocks(tempList);
  }

  return (
    <AppContext.Provider
      value={{
        stocks,
        changePostionUp,
        changePostionDown,
        filterStocks,
        setFilterStocks,
        hideSortBtn,
        setHideSortBtn,
        removeStock,
        editView,
        setEditView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
