import React from "react";
import Stock from "../components/Stock";
import { useGlobalContext } from "../context";

const List = () => {
  const { changePostionUp, changePostionDown, filters, myList, isLoading } =
    useGlobalContext();
const { msg } = filters;

  return (
    <ul>
      {isLoading && (
        <img
          src="https://c.tenor.com/PfFDd3eNE_gAAAAi/loading-load.gif"
          alt="loading"
        />
      )}
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
