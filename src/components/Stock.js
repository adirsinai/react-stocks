import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import {formatPrice} from '../utils/helpers'
import { useGlobalContext } from "../context";
const Stock = (stock) => {

  const {removeStock, menuState } = useGlobalContext();
const { setting, sortBtn } = menuState;
  const {
    symbol,
    shortName,
    regularMarketChange,
    regularMarketChangePercent,
    regularMarketPreviousClose,
    marketCap,
    changePostionUp,
    changePostionDown,
    index,
  } = stock;
  const percentChange = formatPrice(parseFloat(regularMarketChangePercent).toFixed(2));
  const lastTradePriceOnly = parseFloat(regularMarketPreviousClose).toFixed(2);
  ;
  const marketcapToString = String(marketCap).slice(0,2);
  const marketcp = Number(marketcapToString);
  const change = parseFloat(regularMarketChange).toFixed(2);
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
        {symbol}({shortName})
      </p>
      <div>
        {setting && (
          <button className="remove-btn" onClick={() => removeStock(symbol)}>
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
          {(btnCurrentState === "PercentChange" && percentChange + "%") ||
            (btnCurrentState === "LastTradePriceOnly" && lastTradePriceOnly) ||
            (btnCurrentState === "MarketCap" && marketcp + "B")}
        </button>
      </div>
      {sortBtn && (
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
