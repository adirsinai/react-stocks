import React, { useContext, useEffect, useState } from "react";
import { formatPrice } from "./utils/helpers";
import { data } from "./utils/StockData";
import { api } from "./utils/ApiDemoList";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [myList, setMyList] = useState(data);
  const [apiList, setApiList] = useState(api);

  const [menuState, setMenuState] = useState({
    search: false,
    refresh: false,
    filter: false,
    setting: false,
    sortBtn: true,
    myList:true
  });

  const { search, refresh, filter, setting, sortBtn } = menuState;

  const [filters, setFilters] = useState({
    searchTerm: "",
    trend: "all",
    filterdStocks: myList,
    min_percentage: 0,
    max_percentage: 0,
    percentage: 0,
    msg:''
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


  const menuToggle = (currentMenuItem) => {
    if (currentMenuItem === "search") {
      setMenuState({
        ...menuState,
        [currentMenuItem]: !search,
        refresh: false,
        filter: false,
        setting: false,
        sortBtn: true,
        myList: !menuState.myList,
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
        myList: true,
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
        myList: true,
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
        myList: true,
      });
    }
  };

    const searchHandle = (handleTerm) => {
      let tempSearchTrem = filters.filterdStocks.filter((stock) =>
        stock.Symbol.toLowerCase().includes(handleTerm)
      );

      setFilters({ ...filters, filterdStocks: tempSearchTrem });
      if (handleTerm === "") {
        setFilters({
          ...filters,
          filterdStocks: myList,
          msg: "Not found",
        });
      }
    };


  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "all") {
      setFilters({ ...filters, trend: name, filterdStocks: myList });
    }

    if (name === "losing") {
      const losing = myList.filter(
        (p) => formatPrice(parseFloat(p.PercentChange)) <= 0
      );

      setFilters({ ...filters, trend: name, filterdStocks: losing });
    }

    if (name === "gaining") {
      const gaining = myList.filter(
        (p) => formatPrice(parseFloat(p.PercentChange)) >= 0
      );

      setFilters({ ...filters, trend: name, filterdStocks: gaining });
    }

    if (name === "percentage") {
      value = Number(value);

      const tempStocks = myList.filter(
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
    setFilters({ ...filters, filterdStocks: tempList ,msg: "List is Empty", });
  };

  return (
    <AppContext.Provider
      value={{
        menuState,
        changePostionUp,
        changePostionDown,
        filters,
        setFilters,
        removeStock,
        menuToggle,
        updateFilters,
        searchHandle,
        apiList,
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
