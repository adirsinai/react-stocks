import React, { useState } from "react";
import { data } from "../utils/StockData";
import Stock from "../components/Stock";

const List = () => {
  const [stocks, setStocks] = useState(data);

  const changePostionUp = (stockIndex) => {
    let data = [...stocks];
    let temp = data[stockIndex - 1];
    data[stockIndex - 1] = data[stockIndex];
    data[stockIndex] = temp;

    setStocks(data);
  };

  const changePostionDown = (stockIndex) => {
    let data = [...stocks];
    if (stockIndex === data.length -1) {
      stockIndex = 1;
    } 
    let temp = data[stockIndex + 1];
    data[stockIndex + 1] = data[stockIndex];
    data[stockIndex] = temp;

setStocks(data);
  };

  return (
    <ul>
      {stocks.map((stock, index) => {
        return (
          <Stock
            key={stock.Symbol}
            {...stock}
            changePostionUp={changePostionUp}
            changePostionDown={changePostionDown}
            index={index}
          />
        );
      })}
    </ul>
  );
};

export default List;
