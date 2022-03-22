import React from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { useGlobalContext } from "../context";

const SuggestList = () => {
  const { filters, addNewStock, isLoading } = useGlobalContext();
  const { searchsugget,msg } = filters;


  return (
    <ul>
      {isLoading && (
        <img
          src="https://c.tenor.com/PfFDd3eNE_gAAAAi/loading-load.gif"
          alt="loading"
        />
      )}
      {searchsugget.length === 0 && <p className="empty">{msg}</p>}
      {searchsugget.map((stock, index) => {
        return (
          <li key={index}>
            <p>
              {stock.symbol} ({stock.shortname})
            </p>
            <p>{stock.exchange}</p>
            <button
              className="add-stock-btn"
              onClick={() => addNewStock(stock.symbol)}
            >
              <CgPlayListAdd />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SuggestList;
