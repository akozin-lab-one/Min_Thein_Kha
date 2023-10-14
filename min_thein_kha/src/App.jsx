import React, { useState } from "react";
import Main from "./Components/Main";
import { Route, Routes } from "react-router";
import Number from "./Components/Number";
import DataContext from "./Context/DataContext";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [query, setQuery] = useState("");

  const SearchQueo = (event) => {
    setQuery(event.target.value);
    console.log(query);
    if(query !== ''){
      var updatedList = [...items];

      updatedList = updatedList.filter((item) => {
        return (
          item.questionName.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
      console.log(updatedList);
      setSearchList(updatedList);
    }
  };

  return (
    <div>
      <DataContext.Provider value={searchList}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                query={query}
                SearchQueo={SearchQueo}
                setItems={setItems}
                searchList={searchList}
              />
            }
          />
          <Route path="/question/:id" element={<Number />} />
        </Routes>
      </DataContext.Provider>
    </div>
  );
};

export default App;
