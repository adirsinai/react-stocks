import React, { useContext, useState } from "react";
import Stock from "../components/Stock";
import { useGlobalContext } from "../context";

const List = () => {
  const { changePostionUp, changePostionDown, filters } =
    useGlobalContext();
const {filterdStocks} = filters
  return (
    <ul>
      {filterdStocks.length === 0 && (
        <div className="empty">
          <h2>The list is empty</h2>
        </div>
      )}
      {filterdStocks
        .filter((stock) => stock.Symbol.toLowerCase().includes(filters.symbol))
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
