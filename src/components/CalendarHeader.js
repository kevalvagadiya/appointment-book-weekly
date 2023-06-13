import React from "react";
export default function CalendarHeader(props) {
  return (
    <div className="w-full flex justify-between shadow-lg  sticky top-0 bg-white">
      <div>
        <header className="px-2 py-2 flex items-center ">
          <img
            src="../logo.png"
            alt="calendar"
            className="mx-2 w-10 h-10 rounded-full"
          />
          <h1 className="mr-10 text-xl font-medium ">Appointment booking </h1>
        </header>
      </div>
    </div>
  );
}
