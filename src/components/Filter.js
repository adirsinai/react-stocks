import React, { useState } from 'react'

const Filter = () => {

  const [error,setError] = useState({show:false,msg:''})
  

  return (
    <form className="form-control">
      <input type="text" className="searchTerm" placeholder="Search Stock..." />
    </form>
  );
}

export default Filter;