import React from 'react'
import {NavLink} from 'react-router-dom';

const List = ({showdata, searchList, query}) => {
  console.log(query);
  return (
    <div className="mt-5">
    <ul className="h-screen ">

      {query == ""
        ? showdata.map((da) => {
            return (
              <li
                className="cursor-pointer border-black h-[10%] w-[120%] lg:h-[8%] lg:w-[100%] text-xs lg:text-base border-b-2 my-[5%]"
                key={da.questionNo}
              >
                {da.questionName}
              </li>
            );
          })
        : searchList.map((da) => {
            return (
              <li
                className="cursor-pointer border-black h-[7%] w-[115%] lg:h-[8%] lg:w-[100%] text-xs lg:text-base border-b-2 my-[5%]"
                key={da.questionNo}
              >
                
                <NavLink to={`/question/${da.questionNo}`}>
                    {da.questionName}
                </NavLink>
              </li>
            );
          })}
    </ul>
  </div>
  )
}

export default List