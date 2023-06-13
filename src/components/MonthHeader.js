import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getMonth } from "../util";

export default function MonthHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { weekIndex, setWeekIndex } = useContext(GlobalContext);
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  function handlePrevMonth() {
    if (weekIndex === 0) {
      setMonthIndex(monthIndex - 1);
      setWeekIndex(4);
    } else {
      setWeekIndex(weekIndex - 1);
    }
  }
  function handleNextMonth() {
    if (weekIndex === 4) {
      setMonthIndex(monthIndex + 1);
      setWeekIndex(0);
    } else {
      setWeekIndex(weekIndex + 1);
    }
  }

  function toDay() {
    console.log(dayjs().month());
    setMonthIndex(dayjs().month());
    currenMonth.map((row, i) => {
      row.map((day, idx) => {
        if (dayjs().date() == day.date()) {
          setWeekIndex(i);
        }
      });
    });
  }

  const dayname = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <>
      <div className="flex flex-col border sticky top-14 bg-white ">
        <div className="flex justify-between bg-gray-400 border-b p-4">
          <div>
            <span className="text-xl font-bold text-gray-800">
              {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </span>
          </div>
          <div>
            <button
              class="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-black rounded "
              onClick={toDay}
            >
              Today
            </button>
          </div>
          <div className="inline-flex rounded-lg px-1">
            <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out duration-100 
            inline-flex cursor-pointer hover:bg-gray-200 p-2 items-center"
              onClick={handlePrevMonth}
            >
              <AiOutlineLeft />
            </button>
            <div className="border-r inline-flex bg-black h-7 items-center"></div>
            <button
              type="button"
              className="leading-none rounded-lg transition ease-in-out duration-100 
            inline-flex cursor-pointer hover:bg-gray-200 p-2 items-center"
              onClick={handleNextMonth}
            >
              <AiOutlineRight />
            </button>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-8">
            <div className=" flex justify-center items-center py-2  ">
              <label className="text-lg"></label>
            </div>
            {dayname.map((weekDay, index) => (
              <div
                className=" flex justify-center items-center py-2 border-r border-l  "
                key={index}
              >
                <label className="text-lg">{weekDay}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
