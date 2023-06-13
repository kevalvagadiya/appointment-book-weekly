import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AppoinmentModal() {
  const {
    setShowEventModal,
    setShowAppointmentModal,
    daySelected,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  var day = daySelected.valueOf();
  let eventList = [];
  filteredEvents.map((item) => {
    if (day === item.day) {
      eventList.push(item);
    }
  });

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-1 ">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            <button onClick={() => setShowAppointmentModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div
          className={`flex-1 cursor-pointe m-3   `}
          onClick={() => {
            setShowEventModal(true);
          }}
        >
          {eventList.map((evt, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={`bg-${evt.label}-200 p-1 mx-3 text-gray-600 text-sm rounded mb-1 truncate  `}
            >
              {evt.title}
              {` (${evt.mtime.startTime}-${evt.mtime.endTime})`}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
