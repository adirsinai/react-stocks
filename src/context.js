// import axios from "axios";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatPrice } from "./utils/helpers";
import { data } from "./utils/StockData";

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
  const getLocalStorage = ()=>{
    let myList = localStorage.getItem('myList')
    if (myList) {
      return JSON.parse(localStorage.getItem('myList'))
    }else{
      return ["WIX", "MSFT"];
    }
  }
  const [stockSymbol, setStockSymbol] = useState(getLocalStorage());
  const [isLoading,setIsLoading] = useState(false)
  const [myList, setMyList] = useState([]);
  const [ifFetch,setIffetch] = useState(false)
  const rootUrl = 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes';
  const searchUrl = "https://yh-finance.p.rapidapi.com/auto-complete";

  const [menuState, setMenuState] = useState({
    search: false,
    refresh: false,
    filter: false,
    setting: false,
    sortBtn: true,
    myList: true,
  });



  const { search, refresh, filter, setting, sortBtn } = menuState;

  const [filters, setFilters] = useState({
    query: "wix",
    searchsugget: [],
    trend: "all",
    filterdStocks: myList,
    min_percentage: 0,
    max_percentage: 0,
    percentage: 0,
    msg: "",
  });

  const handleSuggestSearch = (event) => {
    if (event.keyCode === 13) {
      fetchSearchSymbols(searchUrl,event.target.value);
    }
  };

  const fetchSearchSymbols = (searchUrl,query) => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: searchUrl,
      params: { q: query, region: "US" },
      headers: {
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
        "x-rapidapi-key": "d2a4059a44msh796332c4bd3f252p1ae83djsnbb8bec078e17",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const { quotes } = response.data;
        setFilters({ ...filters, searchsugget: quotes });
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.error(error);
      });
  };

  const fetchData = (rootUrl, stockSymbol) => {
    setIsLoading(true)
    const options = {
      method: "GET",
      url: rootUrl,
      params: { region: "US", symbols: stockSymbol },
      headers: {
        "x-rapidapi-host": "yh-finance.p.rapidapi.com",
        "x-rapidapi-key": "d2a4059a44msh796332c4bd3f252p1ae83djsnbb8bec078e17",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const { quoteResponse } = response.data;
        setMyList(quoteResponse.result);
        setIffetch(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false)
        console.error(error);
      });
  };

  useEffect(() => {
localStorage.setItem("myList", JSON.stringify(stockSymbol));
  }, [myList]);


  useEffect(() => {
    fetchData(rootUrl,stockSymbol.join(','));
  }, []);

  useEffect(() => {
    let maxPercentage = myList.map((p) =>
      formatPrice(parseFloat(p.regularMarketChangePercent).toFixed(2))
    );
    maxPercentage = Math.max(...maxPercentage);

    let minPercentage = myList.map((p) =>
      formatPrice(parseFloat(p.regularMarketChangePercent).toFixed(2))
    );
    minPercentage = Math.min(...minPercentage);

    setFilters({
      ...filters,
      min_percentage: minPercentage,
      max_percentage: maxPercentage,
      percentage: maxPercentage,
    });
  }, [ifFetch]);

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
      fetchData(rootUrl, stockSymbol.join(","));
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
      setFilters({
        ...filters,
        filterdStocks: myList,
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
      stock.symbol.toLowerCase().includes(handleTerm)
    );
    

    setMyList(tempSearchTrem);
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "all") {
      setMyList(filters.filterdStocks);
      setFilters({ ...filters, trend: name });
    }

    if (name === "losing") {
      const losing = filters.filterdStocks.filter(
        (p) => formatPrice(parseFloat(p.regularMarketChangePercent)) <= 0
      );
      if (losing.length === 0) {
        setFilters({ ...filters, trend: name, msg: "No losing today" });
        setMyList(losing);
      } else {
        setFilters({ ...filters, trend: name });
        setMyList(losing);
      }
    }

    if (name === "gaining") {
      setMyList(filters.filterdStocks);
      const gaining = filters.filterdStocks.filter(
        (p) => formatPrice(parseFloat(p.regularMarketChangePercent)) >= 0
      );
      setFilters({ ...filters, trend: name });
      setMyList(gaining);
    }

    if (name === "percentage") {
      value = Number(value).toFixed(2);

      const tempStocks = filters.filterdStocks.filter(
        (p) => p.regularMarketChangePercent.toFixed(2) <= value
      );

      setMyList(tempStocks);
      setFilters({ ...filters, [name]: value });
    }
  };

  const changePostionUp = (stockIndex) => {
    let data = [...myList];
    let temp = data[stockIndex - 1];
    data[stockIndex - 1] = data[stockIndex];
    data[stockIndex] = temp;

    setMyList(data);
  };

  const changePostionDown = (stockIndex) => {
    let data = [...myList];
    if (stockIndex === data.length - 1) {
      stockIndex = 1;
    }
    let temp = data[stockIndex + 1];
    data[stockIndex + 1] = data[stockIndex];
    data[stockIndex] = temp;

    setMyList(data);
  };

  const removeStock = (symbol) => {
    const tempSymbolList = stockSymbol.filter((sym) => sym !== symbol);
    const tempList = myList.filter((stock) => stock.symbol !== symbol);
    setMyList(tempList);
    setStockSymbol(tempSymbolList);
    setFilters({ ...filters, msg: "List is Empty" });
  };

  const addNewStock = (symbol)=>{
stockSymbol.push(symbol); 

 fetchData(rootUrl, stockSymbol.join(","));
 alert("Your stock is added ,close search panel to see your list!");
  }

  return (
    <AppContext.Provider
      value={{
        addNewStock,
        myList,
        menuState,
        changePostionUp,
        changePostionDown,
        filters,
        setFilters,
        removeStock,
        menuToggle,
        updateFilters,
        searchHandle,
        handleSuggestSearch,
        isLoading,
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
