import React, { useState } from "react";
import Main from "./Components/Main";
import { Route, Routes } from "react-router";
import Number from "./Components/Number";
import DataContext from "./Context/DataContext";
import './App.css'

const App = () => {

  const [items, setItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [query, setQuery] = useState("");
  // const query = useRef();

  const SearchQueo = (event) => {
    // const query = event.target.value;
    setQuery(event.target.value);
    console.log(query);
    var updatedList = [...items];
    // console.log(updateList);

    updatedList = updatedList.filter((item) => {
      // console.log(item.questionName.toLowerCase());
      // console.log(query.toLowerCase());
      return (
        item.questionName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setSearchList(updatedList);
    setQuery(" ");
  };

  // console.log(searchList);
  return (
    <div>
      <DataContext.Provider value={searchList}>
        <Routes>
          <Route path="/" element={<Main query={query} SearchQueo={SearchQueo} setItems={setItems} searchList={searchList} />} />
          <Route path="/question/:id" element={<Number />} />
        </Routes>
      </DataContext.Provider>
    </div>
  );
};

export default App;
