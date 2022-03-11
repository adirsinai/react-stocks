import React, { useContext, useState } from "react";
import Stock from "../components/Stock";
import { useGlobalContext } from "../context";

const List = () => {
  const { stocks, changePostionUp, changePostionDown, filterStocks } =
    useGlobalContext();

  return (
    <ul>
      {stocks
        .filter((stock) => stock.Symbol.toLowerCase().includes(filterStocks))
        .map((stock, index) => {
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
