import React from "react";
import Stock from "../components/Stock";
import { useGlobalContext } from "../context";

const List = () => {
  const { changePostionUp, changePostionDown, filters,myList } =
    useGlobalContext();
const { filterdStocks,msg } = filters;

  return (
    <ul>
      {myList.length === 0 && (
        <div className="empty">
          <h2>{msg}</h2>
        </div>
      )}
      {myList.map((stock, index) => {
        return (
          <Stock
            key={index}
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
