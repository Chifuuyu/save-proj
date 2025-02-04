import { useState, useEffect, useRef, useMemo } from "preact/hooks"; 
import { format, addMonths, subMonths, setYear } from "https://esm.sh/date-fns@3.3.1";

interface CalendarProps {
  setSelectedDate: (date: string) => void;
  closeCalendar: () => void;
  selectedDate: string;
}

export default function Calendar({ setSelectedDate, closeCalendar, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(
    selectedDate ? new Date(selectedDate) : new Date()
  );
  const [isYearGridOpen, setIsYearGridOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const emptyCells = Array(firstDay).fill(null);
  const totalCells = [...emptyCells, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(format(newDate, "yyyy-MM-dd"));

    setTimeout(() => {
      closeCalendar();
    }, 100);
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleYearChange = (year: number) => {
    setCurrentDate(setYear(currentDate, year));
    setIsYearGridOpen(false);
  };

  const generateYears = useMemo(() => {
    const startYear = currentDate.getFullYear() - 7;
    return Array.from({ length: 15 }, (_, i) => startYear + i);
  }, [currentDate]);

  const isSelected = (day: number) => {
    return (
      selectedDate &&
      new Date(selectedDate).getDate() === day &&
      new Date(selectedDate).getMonth() === currentDate.getMonth() &&
      new Date(selectedDate).getFullYear() === currentDate.getFullYear()
    );
  };

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        closeCalendar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeCalendar]);

  return (
    <>
      <div class="fixed inset-0 bg-black bg-opacity-40 z-40" />

      <div
        ref={calendarRef}
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-80 transition-opacity duration-200 z-50"
        style={{ height: "460px" }} // Fixed container height
      >
        {/* Month & Year Header (Always in the same position) */}
        <div class="flex items-center justify-between mb-4 relative z-10">
          {!isYearGridOpen && (
            <button onClick={handlePrevMonth} class="text-xl font-semibold hover:text-indigo-500">
              &lt;
            </button>
          )}

          <div class="flex flex-col items-center w-full">
            <h2 class="text-xl font-bold">{format(currentDate, "MMMM")}</h2>
            <button
              onClick={() => setIsYearGridOpen(!isYearGridOpen)}
              class="text-sm font-semibold hover:text-indigo-500"
            >
              {format(currentDate, "yyyy")}
            </button>
          </div>

          {!isYearGridOpen && (
            <button onClick={handleNextMonth} class="text-xl font-semibold hover:text-indigo-500">
              &gt;
            </button>
          )}
        </div>

        {/* Year Grid (Integrated in the same container but scrollable if needed) */}
        <div class={`overflow-hidden ${isYearGridOpen ? 'block' : 'hidden'}`}>
          <div class="grid grid-cols-3 gap-2 mb-4 transition-all duration-300 ease-in-out">
            {generateYears.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                class={`px-4 py-2 rounded-lg text-sm font-semibold 
                  ${year === currentDate.getFullYear() ? "bg-indigo-500 text-white scale-105" : "hover:bg-indigo-100 dark:hover:bg-gray-600 transition-all transform hover:scale-105"}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid (Only Show When Year Picker is Closed) */}
        {!isYearGridOpen && (
          <>
            {/* Days of the Week */}
            <div class="grid grid-cols-7 gap-1 text-center text-gray-500 text-sm font-semibold mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} class="py-2">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div class="grid grid-cols-7 gap-1">
              {totalCells.map((day, index) => {
                if (day === null) {
                  return <div key={index} class="py-2"></div>;
                }

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    class={`py-4 rounded-lg text-sm font-medium w-full transition-all transform 
                      ${isSelected(day) ? "bg-indigo-500 text-white scale-105" : "hover:bg-indigo-100 text-gray-700"}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
