import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Stock = (stock) => {
  const { Symbol, Name, Change, PercentChange, LastTradePriceOnly, MarketCap } =
    stock;
  const percentChange = parseFloat(PercentChange).toFixed(2);
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
            (btnCurrentState === "MarketCap" && marketCap + "B")}
        </button>
      </div>
      <div className="sort">
        <button>
          <TiArrowSortedUp className="arrow-btn up" />
        </button>
        <button>
          <TiArrowSortedDown className="arrow-btn down" />
        </button>
      </div>
    </li>
  );
};

export default Stock;
