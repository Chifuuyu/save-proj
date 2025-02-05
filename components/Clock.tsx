import { useState } from "preact/hooks";

interface AnalogClockProps {
  onClose: () => void;
  onTimeSelect: (hour: string, minute: string) => void;
  selectedTime: { hour: string; minute: string };
}

const AnalogClock = ({ onClose, onTimeSelect, selectedTime }: AnalogClockProps) => {
  const [hour, setHour] = useState(parseInt(selectedTime.hour));
  const [minute, setMinute] = useState(parseInt(selectedTime.minute));

  const handleHourChange = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const hourAngle = ((angle + Math.PI / 2) * 12) / (2 * Math.PI);
    setHour(Math.round(hourAngle) % 12);
  };

  const handleMinuteChange = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const minuteAngle = ((angle + Math.PI / 2) * 60) / (2 * Math.PI);
    setMinute(Math.round(minuteAngle) % 60);
  };

  const saveTime = () => {
    onTimeSelect(hour.toString(), minute.toString().padStart(2, "0"));
    onClose();
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-64 h-64 p-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Select Time</h2>

        {/* Analog clock */}
        <div class="relative w-full h-full mt-4" onMouseMove={handleHourChange}>
          <div
            class="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-gray-500"
            onMouseDown={handleMinuteChange}
          >
            {/* Hour Hand */}
            <div
              class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
              style={{
                transform: `rotate(${(hour * 30) + (minute / 60) * 30}deg)`,
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <div class="w-1/2 h-1 bg-black rounded-lg" />
            </div>
          </div>
          {/* Minute Hand */}
          <div
            class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
            style={{
              transform: `rotate(${minute * 6}deg)`,
              transition: "transform 0.2s ease-in-out",
            }}
          >
            <div class="w-1/2 h-1 bg-gray-600 rounded-lg" />
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <button onClick={onClose} class="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-600 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={saveTime} class="px-4 py-2 rounded-lg text-sm bg-blue-500 text-white hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;
