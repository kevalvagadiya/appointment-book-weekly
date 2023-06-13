import React, { useContext, useEffect } from "react";
import Day from "./Day";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function Month({ month }) {
  const { weekIndex, setWeekIndex } = useContext(GlobalContext);

  useEffect(() => {
    month.map((row, i) => {
      row.map((day, idx) => {
        if (dayjs().date() == day.date()) {
          setWeekIndex(i);
        }
      });
    });
  }, []);

  const times = [];
  let a = 1;
  for (var i = 1; i <= 24; i++) {
    if (i <= 12) {
      i == 12
        ? times.push(i + ":" + "00" + " PM")
        : times.push(i + ":" + "00" + " AM");
    } else {
      a == 12
        ? times.push(a + ":" + "00" + " AM")
        : times.push(a + ":" + "00" + " PM");
      a++;
    }
  }

  return (
    <>
      <div className="w-full h-full grid grid-cols-8">
        <div>
          <ul className="w-full h-full grid grid-rows-24 bg-white">
            <li className="flex items-center justify-center h-9 w-full border border-t-0 sticky topdate  bg-white ">
              Times
            </li>
            {times.map((time, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center justify-center h-12 w-full border"
                >
                  {time}
                </li>
              );
            })}
          </ul>
        </div>
        {month.map(
          (row, i) =>
            i == weekIndex && (
              <React.Fragment key={i}>
                {row.map((day, idx) => (
                  <Day day={day} key={idx} rowIdx={i} />
                ))}
              </React.Fragment>
            )
        )}
      </div>
    </>
  );
}
