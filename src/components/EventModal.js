import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

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
export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    savedEvents,
    selectedMeetingTime,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [meetingTime, setMeetingTime] = useState(
    selectedEvent
      ? selectedEvent.mtime
      : selectedMeetingTime
      ? {
          startTime: selectedMeetingTime,
          endTime: times[times.indexOf(selectedMeetingTime) + 1],
        }
      : {
          startTime: "",
          endTime: "",
        }
  );
  const [selected, setSelected] = useState(false);
  const [suggestedTime, setSuggestedTime] = useState({
    startTime: "",
    endTime: "",
  });
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      mtime: meetingTime,
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  useEffect(() => {
    let suggestedTimeValue = [];
    savedEvents.map((item) => {
      if (daySelected.valueOf() === item.day) {
        if (
          (times.indexOf(item.mtime.startTime) <=
            times.indexOf(meetingTime.startTime) &&
            times.indexOf(item.mtime.endTime) >
              times.indexOf(meetingTime.startTime)) ||
          (times.indexOf(item.mtime.startTime) <
            times.indexOf(meetingTime.endTime) &&
            times.indexOf(item.mtime.endTime) >=
              times.indexOf(meetingTime.endTime)) ||
          (times.indexOf(item.mtime.startTime) <
            times.indexOf(meetingTime.endTime) &&
            times.indexOf(item.mtime.startTime) >=
              times.indexOf(meetingTime.startTime))
        ) {
          suggestedTimeValue.push(times.indexOf(item.mtime.endTime));
        } else if (
          suggestedTimeValue.length !== 0 &&
          suggestedTimeValue.length < 2
        ) {
          if (suggestedTimeValue[0] < times.indexOf(item.mtime.startTime)) {
            suggestedTimeValue.push(times.indexOf(item.mtime.startTime));
          } else {
            suggestedTimeValue[0] = times.indexOf(item.mtime.endTime);
          }
        }
      }
    });

    setSuggestedTime({
      startTime: times[suggestedTimeValue[0]],
      endTime:
        times[
          (suggestedTimeValue && suggestedTimeValue[1]) ||
            suggestedTimeValue[0] + 1
        ],
    });
  }, [meetingTime]);

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-10 ">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>
              {daySelected.format("dddd, MMMM DD")}
              <div className="flex w-full justify-between">
                <label for="underline_select" className="sr-only ">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  className="w-5/12 block py-2.5 px-0 text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  onChange={(e) => {
                    const nextIndex = times.indexOf(e.target.value) + 1;
                    setMeetingTime({
                      ...meetingTime,
                      startTime: e.target.value,
                      endTime: times[nextIndex],
                    });
                  }}
                >
                  {times.map((item, index) => {
                    return selectedEvent &&
                      selectedEvent.mtime.startTime === item ? (
                      <option
                        className="w-full "
                        selected
                        value={meetingTime.startTime}
                      >
                        {meetingTime.startTime}
                      </option>
                    ) : meetingTime.startTime === item ? (
                      <option
                        className="w-full"
                        selected
                        value={meetingTime.startTime}
                      >
                        {meetingTime.startTime}
                      </option>
                    ) : (
                      <option value={item}>{item}</option>
                    );
                  })}
                </select>
                <p className="flex items-center">-</p>
                <label for="underline_select" className="sr-only ">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  className=" w-5/12 block py-2.5 px-0 text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 "
                  onChange={(e) => {
                    setMeetingTime({
                      ...meetingTime,
                      endTime: e.target.value,
                    });
                  }}
                >
                  {times.map((item, index) => {
                    if (times.indexOf(meetingTime.startTime) < index) {
                      return selectedEvent &&
                        selectedEvent.mtime.endTime === item ? (
                        <option
                          className="w-full"
                          selected
                          value={meetingTime.endTime}
                        >
                          {meetingTime.endTime}
                        </option>
                      ) : meetingTime.endTime === item ? (
                        <option
                          className="w-full"
                          selected
                          value={meetingTime.endTime}
                        >
                          {meetingTime.endTime}
                        </option>
                      ) : (
                        <option value={item}>{item}</option>
                      );
                    }
                  })}
                </select>
              </div>
            </p>
            {!selectedEvent && suggestedTime.startTime ? (
              <>
                <span></span>
                <div className="flex flex-col">
                  <span>Suggested time</span>
                  {!selected && (
                    <span className="text-red-500 text-xs">
                      selected time not available
                    </span>
                  )}
                  <div className="flex items-center mt-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onClick={() => {
                        setMeetingTime({ ...suggestedTime });
                      }}
                      onChange={(e) => {
                        setSelected(e.target.checked);
                      }}
                      checked={selected}
                    />
                    <label
                      for="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {suggestedTime.startTime + " - " + suggestedTime.endTime}
                    </label>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
