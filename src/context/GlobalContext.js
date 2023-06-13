import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  weekIndex: 0,
  setWeekIndex: (index) => {},
  selectedMeetingTime: 0,
  setSelectedMeetingTime: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  showAppointmentModal: false,
  setShowAppointmentModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [
    {
      title: "interview for React dev",
      description: "",
      label: "indigo",
      day: 1685125800000,
      id: 1685170930841,
      mtime: {
        startTime: "2:00",
        endTime: "2:15",
      },
    },
    {
      title: "interview for React dev",
      description: "",
      label: "indigo",
      day: 1685125800000,
      id: 1685170930841,
      mtime: {
        startTime: "5:00",
        endTime: "5:45",
      },
    },
    {
      title: "interview for React dev",
      description: "",
      label: "indigo",
      day: 1685125800000,
      id: 1685170930841,
      mtime: {
        startTime: "6:00",
        endTime: "6:45",
      },
    },
  ],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
});

export default GlobalContext;
