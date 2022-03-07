import React, { useState } from "react";
import { data } from "../utils/StockData";
import Stock from "../components/Stock";

const List = () => {
  return (
    <ul>
      {data.map((stock, index) => {
        return <Stock key={index} {...stock} />;
      })}
    </ul>
  );
};

export default List;
