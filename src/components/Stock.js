import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import {formatPrice} from '../utils/helpers'
import { useGlobalContext } from "../context";
const Stock = (stock) => {

  const { hideSortBtn, removeStock, editView, filters } = useGlobalContext();

  const {
    Symbol,
    Name,
    Change,
    PercentChange,
    LastTradePriceOnly,
    MarketCap,
    changePostionUp,
    changePostionDown,
    index,
  } = stock;
  const percentChange = formatPrice(parseFloat(PercentChange));
  const lastTradePriceOnly = parseFloat(LastTradePriceOnly).toFixed(2);
  const marketCap = parseFloat(MarketCap).toFixed(2);
  const change = parseFloat(Change).toFixed(2);
  const [btnCurrentState, setBtnCurrentState] = useState("PercentChange");
  const [tempStateBtn, setTempStateBtn] = useState(1);

  const btnDisplay = () => {
    const temp = (tempStateBtn + 1) % 3;
    setTempStateBtn(temp);
    if (tempStateBtn === 0) {
      setBtnCurrentState("PercentChange");
    }
    if (tempStateBtn === 1) {
      setBtnCurrentState("LastTradePriceOnly");
    }
    if (tempStateBtn === 2) {
      setBtnCurrentState("MarketCap");
    }
  };



  return (
    <li>
      <p>
        {Symbol}({Name})
      </p>
      <div>
        {editView && (
          <button className="remove-btn" onClick={() => removeStock(Symbol)}>
            <FaTrash />
          </button>
        )}

        <span>{change}</span>
        <button
          className="display-btn"
          style={
            percentChange > 0
              ? { backgroundColor: "#63DA3A" }
              : { backgroundColor: "#FF4F46" }
          }
          onClick={btnDisplay}
        >
          {(btnCurrentState === "PercentChange" && percentChange + '%') ||
            (btnCurrentState === "LastTradePriceOnly" && lastTradePriceOnly) ||
            (btnCurrentState === "MarketCap" && marketCap + "B")}
        </button>
      </div>
      {hideSortBtn && (
        <div className="sort">
          <button className="sort-btn">
            <TiArrowSortedUp
              className="arrow-btn up"
              onClick={() => changePostionUp(index)}
            />
          </button>
          <button className="sort-btn">
            <TiArrowSortedDown
              className="arrow-btn down"
              onClick={() => changePostionDown(index)}
            />
          </button>
        </div>
      )}
    </li>
  );
};

export default Stock;
