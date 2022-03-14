import React, { useContext, useEffect, useState } from "react";
import { formatPrice } from "./utils/helpers";
import { data } from "./utils/StockData";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stocks, setStocks] = useState(data);
  const [hideSortBtn, setHideSortBtn] = useState(true);
  const [editView, setEditView] = useState(false);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const [openRefreshMenu, setOpenRefreshMenu] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    symbol: "",
    trend: "all",
    filterdStocks: stocks,
    min_percentage: 0,
    max_percentage: 0,
    percentage: 0,
  });

  useEffect(() => {
    let maxPercentage = stocks.map((p) =>
      formatPrice(parseFloat(p.PercentChange))
    );
    maxPercentage = Math.max(...maxPercentage);

    let minPercentage = stocks.map((p) =>
      formatPrice(parseFloat(p.PercentChange))
    );
    minPercentage = Math.min(...minPercentage);

    setFilters({
      ...filters,
      min_percentage: minPercentage,
      max_percentage: maxPercentage,
      percentage: maxPercentage,
    });
  }, [stocks]);

  const menuToggle = (currentMenuItem) => {
    if (currentMenuItem === "search") {
      setOpenSearchMenu(!openSearchMenu);
      setOpenRefreshMenu(false);
      setOpenFilterMenu(false);
    }
    if (currentMenuItem === "refresh") {
      setOpenRefreshMenu(!openRefreshMenu);
      setOpenFilterMenu(false);
      setOpenSearchMenu(false);
    }
    if (currentMenuItem === "filter") {
      setOpenFilterMenu(!openFilterMenu);
      setHideSortBtn(!hideSortBtn);
      setOpenSearchMenu(false);
      setOpenRefreshMenu(false);
    }
    if (currentMenuItem === "setting") {
      setEditView(!editView);
      setOpenFilterMenu(false);
      setOpenSearchMenu(false);
      setOpenRefreshMenu(false);
    }
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "all") {
      setFilters({ ...filters, trend: name, filterdStocks: stocks });
    }

    if (name === "losing") {
      const losing = stocks.filter(
        (p) => formatPrice(parseFloat(p.PercentChange)) <= 0
      );

      setFilters({ ...filters, trend: name, filterdStocks: losing });
    }

    if (name === "gaining") {
      const gaining = stocks.filter(
        (p) => formatPrice(parseFloat(p.PercentChange)) >= 0
      );

      setFilters({ ...filters, trend: name, filterdStocks: gaining });
    }

    if (name === "percentage") {
      value = Number(value);
      setFilters({ ...filters, [name]: value });
    }
  };

  const changePostionUp = (stockIndex) => {
    let data = [...filters.filterdStocks];
    let temp = data[stockIndex - 1];
    data[stockIndex - 1] = data[stockIndex];
    data[stockIndex] = temp;

    setFilters({ ...filters, filterdStocks: data });
  };

  const changePostionDown = (stockIndex) => {
    let data = [...filters.filterdStocks];
    if (stockIndex === data.length - 1) {
      stockIndex = 1;
    }
    let temp = data[stockIndex + 1];
    data[stockIndex + 1] = data[stockIndex];
    data[stockIndex] = temp;

    setFilters({ ...filters, filterdStocks: data });
  };

  const removeStock = (symbol) => {
    const tempList = stocks.filter((stock) => stock.Symbol !== symbol);
    setStocks(tempList);
  };

  return (
    <AppContext.Provider
      value={{
        stocks,
        changePostionUp,
        changePostionDown,
        filters,
        setFilters,
        hideSortBtn,
        setHideSortBtn,
        removeStock,
        editView,
        setEditView,
        menuToggle,
        openSearchMenu,
        openRefreshMenu,
        openFilterMenu,
        updateFilters,
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
