import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    setShowAppointmentModal,
    filteredEvents,
    setSelectedEvent,
    setSelectedMeetingTime,
    selectedMeetingTime,
  } = useContext(GlobalContext);

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

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  function prveDate() {
    return day.format("YY") + day.format("MM") + day.format("DD") <
      dayjs().format("YY") + dayjs().format("MM") + dayjs().format("DD")
      ? "text-gray-400"
      : "";
  }
  function eventModel() {
    return day.format("YY") + day.format("MM") + day.format("DD") >=
      dayjs().format("YY") + dayjs().format("MM") + dayjs().format("DD")
      ? true
      : false;
  }

  return (
    <div className="border border-t-0 border-gray-200 flex flex-col bg-white  ">
      <header className="flex flex-col items-center sticky topdate bg-white border border-t-0 h-full">
        <p
          className={` text-sm p-1 my-1 text-center   ${prveDate()}  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="w-full h-full  ">
        <ul className="w-full h-full grid grid-rows-24 ">
          {times.map((time, index) => {
            return (
              <li
                key={index}
                className="h-12 w-full border"
                onClick={() => {
                  setDaySelected(day);
                  setShowEventModal(eventModel());
                  setSelectedMeetingTime(time);
                }}
              >
                {dayEvents.map((evt, idx) =>
                  times.indexOf(evt.mtime.startTime) == times.indexOf(time) ? (
                    <div
                      key={idx}
                      onClick={() => setSelectedEvent(evt)}
                      className={`bg-${evt.label}-200 p-2 text-gray-600 text-xs h-12 rounded mb-1 truncate  `}
                    >
                      {evt.title}
                      {` (${evt.mtime.startTime}-${evt.mtime.endTime})`}
                    </div>
                  ) : times.indexOf(evt.mtime.endTime) - 1 ==
                    times.indexOf(time) ? (
                    <div
                      key={idx}
                      onClick={() => setSelectedEvent(evt)}
                      className={`bg-${evt.label}-200 p-3 text-gray-600 text-sm h-full rounded rounded-t-none mb-1 truncate  `}
                    >
                      {/* {evt.title}{` (${evt.mtime.startTime}-${evt.mtime.endTime})`} */}
                    </div>
                  ) : times.indexOf(evt.mtime.startTime) <
                      times.indexOf(time) &&
                    times.indexOf(evt.mtime.endTime) > times.indexOf(time) ? (
                    <div
                      key={idx}
                      onClick={() => setSelectedEvent(evt)}
                      className={`bg-${evt.label}-200  text-gray-600 text-sm  h-12 truncate  `}
                    ></div>
                  ) : (
                    ""
                  )
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
