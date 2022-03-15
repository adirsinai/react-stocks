import React from "react";
import "./index.css";
import Header from "./components/Header";
import List from "./components/List";
import SuggestList from "./components/SuggestList"; 
import { useGlobalContext } from "./context";

const App = () => {
  const {menuState} = useGlobalContext()
  const { search, myList } = menuState;
  return (
    <section>
      <Header />
      {myList && <List />}
      {search && <SuggestList />}
    </section>
  );
};

export default App;
