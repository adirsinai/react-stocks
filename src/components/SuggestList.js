import React from 'react'
import { useGlobalContext } from "../context";

const SuggestList = () => {
const {apiList} = useGlobalContext()

  return (
    <ul>
      {apiList.map((stock,index)=>{
        return (
          <li key={index}>
            <p>
              {stock.symbol} ({stock.name})
            </p>
            <p>{stock.exchange_name}</p>
          </li>
        );
      })}
      
    </ul>
  );
}

export default SuggestList