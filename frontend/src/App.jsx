import React from "react";
import Time from "./Time";
import { FiClock, FiCalendar } from "react-icons/fi";
import Fotter from "./Fotter";

const App = () => {
  const periodTimings = {
    1: "9:30–10:20",
    2: "10:20–11:10",
    3: "11:20–12:10",
    4: "12:10–13:00",
    5: "13:05–13:55",
    6: "13:55–14:45",
    7: "14:45–15:35",
    8: "15:35–16:25",
  };

  const timetable601 = {
    Mon: [1, 2, 3, 5],
    Tue: [2,3,5,6,7,8],
    Wed: [1, 2, 3, 4 , 6],
    Thu: [1, 2, 3, 4 , 6],
    Fri: [1,2,5,6],
  };

  const timetable607 = {
    Mon: [1, 2, 3, 4, 6, 7],
    Tue: [2, 3, 4, 6, 7, 8],
    Wed: [1,2,3,5,6],
    Thu: [1, 2, 3,4,6,7],
    Fri: [1, 2, 3],
  };

  const allPeriods = [1, 2, 3, 4, 5, 6, 7, 8];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const getFreeSlots = (busy) => {
    return allPeriods.filter((period) => !busy.includes(period));
  };

  const getCommonFree = (day) => {
    const freeA = getFreeSlots(timetable601[day] || []);
    const freeB = getFreeSlots(timetable607[day] || []);
    return freeA.filter((period) => freeB.includes(period));
  };

  const currentTime = Time();
  const currentDay = weekdays[currentTime.getDay() - 1];

  const getMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const isCurrentPeriod = (period) => {
    const range = periodTimings[period];
    if (!range) return false;

    const [start, end] = range.replace("–", "-").split("-");
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return now >= getMinutes(start) && now <= getMinutes(end);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold flex justify-center items-center gap-2 text-white mb-2">
          <FiClock className="text-teal-400" size={32} />
          Shared Availability Tracker
        </h1>
        <p className="text-sm text-gray-400">(24BCS-601 & 24BCS-607)</p>
      </div>

      <p className="text-center text-lg mb-10 text-teal-400">
        🕒 Current Time:{" "}
        <span className="font-bold text-white">
          {currentTime.toLocaleTimeString()}
        </span>
      </p>

      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {weekdays.map((day) => {
          const common = getCommonFree(day);
          const isToday = day === currentDay;

          return (
            <div
              key={day}
              className={`rounded-xl border border-white/10 p-5 shadow-md hover:shadow-lg transition-all duration-200 ${
                isToday
                  ? "bg-gradient-to-br from-[#1e293b] to-[#0f172a]"
                  : "bg-[#1e1e2e]"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-3 flex items-center gap-2 ${
                  isToday ? "text-teal-400" : "text-blue-300"
                }`}
              >
                <FiCalendar /> {day}
              </h2>

              {common.length > 0 ? (
                <ul className="text-sm text-gray-300 space-y-2">
                  {common.map((period) => {
                    const highlight = isToday && isCurrentPeriod(period);
                    return (
                      <li
                        key={period}
                        className={`px-3 py-1 rounded-md transition-colors duration-150 ${
                          highlight
                            ? "bg-red-600/20 text-red-400 font-bold"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <span className="text-blue-400 font-medium">
                          Period {period}
                        </span>{" "}
                        – {periodTimings[period]}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-red-400">No common free periods</p>
              )}
            </div>
          );
        })}
      </div>
      <Fotter/>
    </div>
  );
};

export default App;
