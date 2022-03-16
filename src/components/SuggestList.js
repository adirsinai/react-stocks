import React from 'react'
import { CgPlayListAdd } from "react-icons/cg";
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
            <button className='add-stock-btn'><CgPlayListAdd/></button>
          </li>
        );
      })}
      
    </ul>
  );
}

export default SuggestList