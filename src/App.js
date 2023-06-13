import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import AppointmentModal from "./components/AppointmentModal";
import MonthHeader from "./components/MonthHeader";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showAppointmentModal } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <CalendarHeader />

      {showEventModal && <EventModal />}
      {showAppointmentModal && <AppointmentModal />}
      <div className="h-full flex flex-col p-14 pt-0 bg-white ">
        <MonthHeader />
        <div className="flex flex-1 bg-white">
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
