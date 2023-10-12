import React, { useContext, useEffect, useState } from "react";
import { api } from "../api/apiResource";
import { NavLink, useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";

export const Number = () => {
  const mainData = useContext(DataContext);
  // console.log(mainData);
  const questionNum = useParams();
  // console.log(parseInt(questionNum.id));
  const title = mainData.map((mainda) =>
    mainda.questionNo === parseInt(questionNum.id)
      ? mainda.questionName
      : "no title"
  );
  // console.log(title[questionNum.id - 1]);
  const [number, setNumber] = useState([]);
  const showNumber = async () => {
    const res = await api.get("/numberList");
    console.log(res.data);
    setNumber(res.data);
    console.log(number);
  };
  useEffect(() => {
    showNumber();
  }, []);

  const [answer, setAnswer] = useState([]);

  const getAnswer = async () => {
    const res = await api.get("answers");
    console.log(res.data);
    setAnswer(res.data);
    console.log(answer);
  };

  useEffect(() => {
    getAnswer();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [answerTitle, setAnswerTitle] = useState("");
  const min = 1;
  const max = 10;
  const openModal = (num) => {
    setSelectedNumber(num);
    const questionId = parseInt(questionNum.id);
    const questionTitle = answer.filter((ans) =>
      ans.questionNo === questionId ? ans : ""
    );
    setAnswerTitle(questionTitle[num].answerResult);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNumber(null);
    setIsModalOpen(false);
  };

  if (JSON.stringify(number) !== "[]") {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className=" container w-[43%]">
          <div className="my-3">
            <NavLink to="/">
              <p className="bg-black w-28 text-center rounded drop-shadow h-[28px] mx-auto text-white">
                နောက်သို့
              </p>
            </NavLink>
            <h3 className="text-center my-3">{title[questionNum.id - 1]}</h3>
          </div>
          <div className="grid grid-cols-9 gap-y-3 gap-x-16 w-96">
            {number.map((num, index) => {
              return [
                <button
                  key={index}
                  className="bg-black w-12 rounded hover:scale-110 hover:drop-shadow duration-75 text-white"
                  type="button"
                  onClick={() =>
                    openModal(Math.floor(Math.random() * (max - min + 1)) + min)
                  }
                >
                  {num}
                </button>,
              ];
            })}

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container h-96 bg-white w-96 rounded shadow-lg p-4 z-50">
                  <div className="text-center">
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer my-5"
                      onClick={closeModal}
                    >
                      နောက်သို့
                    </button>
                  </div>
                  <p className="h-96 flex align-middle">{answerTitle}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Number;
