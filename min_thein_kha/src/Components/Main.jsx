import React, { memo, useEffect, useState } from "react";
import { api } from "../api/apiResource";
import List from "./List";
import { useLocation } from "react-router";

const Main = ({setItems, SearchQueo, searchList, query}) => {
  let location = useLocation();
  console.log(location.pathname);
  console.log("component is loading")

  const [showdata, setShowData] = useState([]);
  const getQue = async () => {
    const res = await api.get("questions");
    console.log(res.data);
    setItems(res.data);
    setShowData(res.data.slice(0, 6));
    console.log(showdata);
  };

  useEffect(() => {
    getQue();
  }, []);
  

  if (JSON.stringify(showdata) !== "[]") {
    return (
      <div className="h-screen  mx-auto flex justify-center  container items-center">
        <div className="w-[50%] text-center h-96 mt-3">
          <img
            className="w-28 mx-auto drop-shadow-md"
            src="/images/min_thein_Kha.png"
            alt=""
          />
          <input
            className="w-72 mt-8 h-[32px] border border-gray-300 rounded-md pl-3 text-sm"
            onChange={SearchQueo}
            type="text"
            name=""
            id=""
            placeholder="သင်လိုရာမေးနိုင်သည်"
          />

          <List showdata={showdata} searchList={searchList} query={query} />
        </div>
      </div>
    );
  } else {
    <h1>You need to loading Data...</h1>;
  }
};

export default Main;
