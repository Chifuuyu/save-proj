import { useState } from "preact/hooks";
import Calendar from "./Calendar.tsx"; // Ensure you have a ShadCN-styled Calendar component

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("16:20");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Add Transaction</h1>
          <button onClick={onClose} class="text-gray-500 hover:text-gray-700 text-xl font-semibold">&times;</button>
        </div>

        {/* Transaction Type */}
        <div class="flex justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          <button class={`flex-1 p-2 rounded-lg transition-colors ${type === "expense" ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"}`} onClick={() => setType("expense")}>Expense</button>
          <button class={`flex-1 p-2 rounded-lg transition-colors ${type === "income" ? "bg-green-500 text-white" : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"}`} onClick={() => setType("income")}>Income</button>
        </div>

        {/* Amount Input */}
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <input
            type="text"
            value={amount}
            onInput={(e) => setAmount(e.currentTarget.value)}
            class="w-full text-2xl font-bold bg-transparent focus:outline-none text-gray-900 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 placeholder:text-gray-500"
            placeholder="₱0"
          />
        </div>

        {/* Date & Time */}
        <div class="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            📅 <span class="font-bold">{date || "Select Date"}</span>
          </button>
          <input
            type="time"
            value={time}
            onInput={(e) => setTime(e.currentTarget.value)}
            class="w-20 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-center text-lg border-b-2 border-gray-300 dark:border-gray-700"
          />
        </div>
        {showCalendar && date !== undefined && (<Calendar setSelectedDate={(newDate) => setDate(newDate)} closeCalendar={() => setShowCalendar(false)} selectedDate={date || ""} />)}


        {/* Title & Notes */}
        <input
          type="text"
          value={title}
          onInput={(e) => setTitle(e.currentTarget.value)}
          class="mt-4 p-3 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none placeholder:text-gray-500"
          placeholder="Title"
        />
        <textarea
          value={notes}
          onInput={(e) => setNotes(e.currentTarget.value)}
          class="mt-2 p-3 w-full bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none placeholder:text-gray-500"
          placeholder="Notes"
        ></textarea>

        {/* Actions */}
        <div class="flex justify-between mt-4">
          <button
            onClick={onClose}
            class="px-4 py-2 rounded border border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
}
