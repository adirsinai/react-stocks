import React, { useContext, useEffect, useState } from "react";
import { formatPrice } from "./utils/helpers";
import { data } from "./utils/StockData";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stocks, setStocks] = useState(data);

  const [menuState, setMenuState] = useState({
    search: false,
    refresh: false,
    filter: false,
    setting: false,
    sortBtn: true,
  });

  const { search, refresh, filter, setting, sortBtn } = menuState;

  const [filters, setFilters] = useState({
    searchTerm: "",
    trend: "all",
    filterdStocks: stocks,
    min_percentage: 0,
    max_percentage: 0,
    percentage: 0,
  });

  useEffect(() => {
    let maxPercentage = filters.filterdStocks.map((p) =>
      formatPrice(parseFloat(p.PercentChange))
    );
    maxPercentage = Math.max(...maxPercentage);

    let minPercentage = filters.filterdStocks.map((p) =>
      formatPrice(parseFloat(p.PercentChange))
    );
    minPercentage = Math.min(...minPercentage);

    setFilters({
      ...filters,
      min_percentage: minPercentage,
      max_percentage: maxPercentage,
      percentage: maxPercentage,
    });
  }, []);

  const searchHandle = (handleTerm) => {
    let tempSearchTrem = filters.filterdStocks.filter((stock) =>
      stock.Symbol.toLowerCase().includes(handleTerm)
    );

    setFilters({ ...filters, filterdStocks: tempSearchTrem });
    if (handleTerm === "") {
      setFilters({ ...filters, filterdStocks: stocks });
    }
  };

  const menuToggle = (currentMenuItem) => {
    if (currentMenuItem === "search") {
      setMenuState({
        ...menuState,
        [currentMenuItem]: !search,
        refresh: false,
        filter: false,
        setting: false,
        sortBtn: true,
      });
    }
    if (currentMenuItem === "refresh") {
      setMenuState({
        ...menuState,
        [currentMenuItem]: !refresh,
        search: false,
        filter: false,
        setting: false,
        sortBtn: true,
      });
    }
    if (currentMenuItem === "filter") {
      setMenuState({
        ...menuState,
        [currentMenuItem]: !filter,
        search: false,
        refresh: false,
        setting: false,
        sortBtn: !sortBtn,
      });
    }
    if (currentMenuItem === "setting") {
      setMenuState({
        ...menuState,
        [currentMenuItem]: !setting,
        search: false,
        refresh: false,
        filter: false,
        sortBtn: true,
      });
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

      const tempStocks = stocks.filter(
        (p) => formatPrice(parseFloat(p.PercentChange)) <= value
      );

      setFilters({ ...filters, [name]: value, filterdStocks: tempStocks });
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
    const tempList = filters.filterdStocks.filter(
      (stock) => stock.Symbol !== symbol
    );
    setFilters({ ...filters, filterdStocks: tempList });
  };

  return (
    <AppContext.Provider
      value={{
        stocks,
        menuState,
        changePostionUp,
        changePostionDown,
        filters,
        setFilters,
        removeStock,
        menuToggle,
        updateFilters,
        searchHandle,
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
