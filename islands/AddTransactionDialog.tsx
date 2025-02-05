import { useState } from "preact/hooks";
import Calendar from "./Calendar.tsx";
import AnalogClock from "./Clock.tsx";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState("");

  // New state for time selection and modal display
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimeModal, setShowTimeModal] = useState(false);

  // Validation function for input fields
  const validate = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount.");
      return false;
    }
    if (!title) {
      setError("Title cannot be empty.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      alert(
        "Transaction Saved!\n" +
          `Type: ${type}\nAmount: ${amount}\nDate: ${date ? formatDate(date) : "Today"}\nTime: ${selectedTime}\nTitle: ${title}\nNotes: ${notes}`
      );
      onClose();
    }
  };

  // Format date as before
  const formatDate = (selectedDate: string) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    if (selected.getFullYear() === today.getFullYear()) {
      return selected.toLocaleString("en-US", { month: "long", day: "numeric" });
    } else {
      return selected.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-md p-4">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-xs font-semibold text-gray-900 dark:text-white">Add Transaction</h1>
            <button
              onClick={onClose}
              class="text-gray-500 hover:text-gray-700 text-lg font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Transaction Type */}
          <div class="flex justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4 gap-1">
            <button
              onClick={() => setType("expense")}
              class={`flex-1 p-3 text-xs font-semibold transition-colors ${
                type === "expense" ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => setType("income")}
              class={`flex-1 p-3 text-xs font-semibold transition-colors ${
                type === "income" ? "bg-green-500 text-white" : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount Input */}
          <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <input
              type="text"
              value={amount}
              onInput={(e) => setAmount(e.currentTarget.value)}
              class="w-full text-sm font-bold bg-transparent focus:outline-none text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 placeholder:text-gray-500"
              placeholder="₱0"
            />
          </div>

          {/* Date & Time */}
          <div class="flex justify-between items-center mt-4 gap-1">
            {/* Date Button (unchanged) */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              class="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white relative hover:text-blue-500 transition-colors"
              aria-label="Open calendar"
            >
              <span class="text-lg font-bold relative">
                📅
                <span class="absolute inset-0 bg-gradient-to-r from-pink-200 to-orange-300 opacity-30 transition-all duration-300 hover:opacity-50 rounded-lg p-1"></span>
              </span>
              <span>{date ? formatDate(date) : "Today"}</span>
            </button>

            {/* Time Button replacing editable inputs */}
            <button
              onClick={() => setShowTimeModal(true)}
              class="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white relative hover:text-blue-500 transition-colors"
              aria-label="Open time picker"
            >
              <span>🕒</span>
              <span>{selectedTime || "Set Time"}</span>
            </button>
          </div>

          {showCalendar && (
            <Calendar
              setSelectedDate={(newDate) => setDate(newDate)}
              closeCalendar={() => setShowCalendar(false)}
              selectedDate={date || ""}
            />
          )}

          {/* Title & Notes */}
          <input
            type="text"
            value={title}
            onInput={(e) => setTitle(e.currentTarget.value)}
            class="mt-4 p-3 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none text-xs placeholder:text-gray-500"
            placeholder="Title"
          />
          <textarea
            value={notes}
            onInput={(e) => setNotes(e.currentTarget.value)}
            class="mt-2 p-3 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none text-xs placeholder:text-gray-500"
            placeholder="Notes"
          ></textarea>

          {/* Error Message */}
          {error && <div class="text-red-500 mt-2 text-xs">{error}</div>}

          {/* Actions */}
          <div class="flex justify-between mt-4">
            <button
              onClick={onClose}
              class="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 dark:text-gray-300 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              class="px-6 py-2 rounded-lg bg-blue-500 text-white text-xs hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Time Picker Modal */}
      {showTimeModal && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-sm p-4 relative">
            <button
              onClick={() => setShowTimeModal(false)}
              class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              aria-label="Close time picker"
            >
              &times;
            </button>
            <AnalogClock
              onSelect={(timeString: string) => {
                setSelectedTime(timeString);
                setShowTimeModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
