import { useState } from "preact/hooks";
import Calendar from "./Calendar.tsx";
import AnalogClock from "./Clock.tsx";

// Example category modal for demonstration
function CategoryModal({
  onSelect,
  onClose,
}: {
  onSelect: (cat: string) => void;
  onClose: () => void;
}) {
  const categories = ["Default", "Upcoming", "Subscription", "No goal", "Testing"];
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div class="bg-[#FFE5D0] text-[#5C3F3F] rounded-xl shadow-2xl w-full max-w-sm p-4 relative">
        <button
          onClick={onClose}
          class="absolute top-2 right-2 text-[#5C3F3F] text-lg font-bold"
          aria-label="Close category picker"
        >
          &times;
        </button>
        <h2 class="text-sm font-semibold mb-2">Select a Category</h2>
        <ul class="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                class="w-full text-left py-2 px-3 rounded-md bg-[#FFD6BA] hover:bg-[#FFC9A8] transition-colors"
                onClick={() => onSelect(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({
  isOpen,
  onClose,
}: AddTransactionModalProps) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Validate inputs
  const validate = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount.");
      return false;
    }
    if (!title) {
      setError("Title cannot be empty.");
      return false;
    }
    if (!category) {
      setError("Please select a category.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      alert(
        `Transaction Saved!
Type: ${type}
Amount: ₱${amount}
Date: ${date ? formatDate(date) : "Today"}
Time: ${selectedTime || "No time set"}
Category: ${category}
Title: ${title}
Notes: ${notes}`
      );
      onClose();
    }
  };

  const formatDate = (selectedDate: string) => {
    const today = new Date();
    const chosen = new Date(selectedDate);
    if (chosen.getFullYear() === today.getFullYear()) {
      return chosen.toLocaleString("en-US", { month: "long", day: "numeric" });
    }
    return chosen.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
        {/* Main Modal Container */}
        <div class="bg-[#FCE6DF] text-[#5C3F3F] rounded-xl shadow-2xl w-full max-w-md p-4">
          {/* Header */}
          <div class="flex justify-between items-center mb-3">
            <h1 class="text-sm font-bold">Add Transaction</h1>
            <button
              onClick={onClose}
              class="text-[#5C3F3F] text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Expense / Income Toggle */}
          <div class="flex justify-between items-center rounded-lg bg-[#FAD4C0] p-1 mb-4">
            <button
              onClick={() => setType("expense")}
              class={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                type === "expense"
                  ? "bg-[#FA9076] text-white"
                  : "text-[#5C3F3F] hover:bg-[#FBC6B2]"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => setType("income")}
              class={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
                type === "income"
                  ? "bg-[#A3E1C2] text-[#3F4F3F]"
                  : "text-[#5C3F3F] hover:bg-[#FBC6B2]"
              }`}
            >
              Income
            </button>
          </div>

          {/* Category & Amount Container */}
          <div class="flex items-center justify-between mb-4 p-3 rounded-lg bg-[#FAD4C0]">
            {/* Category Button (blank box) */}
            <button
              onClick={() => setShowCategoryModal(true)}
              class={`w-14 h-14 flex items-center justify-center bg-[#FFE5D0] rounded-md text-xs font-semibold text-[#5C3F3F] 
              hover:bg-[#FFD6BA] transition-colors`}
            >
              {category || ""}
            </button>

            {/* Editable Amount */}
            <div class="flex items-center text-2xl font-bold">
              <span class="mr-1">₱</span>
              <input
                type="text"
                value={amount}
                onInput={(e) => setAmount(e.currentTarget.value)}
                class="bg-transparent focus:outline-none text-right w-24"
                placeholder="0"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div class="flex items-center justify-between mb-4 px-1">
            <button
              onClick={() => setShowCalendar(true)}
              class="flex items-center gap-1 text-sm font-semibold hover:text-[#FA9076]"
            >
              <span>📅</span>
              <span>{date ? formatDate(date) : "Today"}</span>
            </button>

            <button
              onClick={() => setShowTimeModal(true)}
              class="flex items-center gap-1 text-sm font-semibold hover:text-[#FA9076]"
            >
              <span>🕒</span>
              <span>{selectedTime || "Set Time"}</span>
            </button>
          </div>

          {/* Title & Notes */}
          <div class="mb-2">
            <input
              type="text"
              value={title}
              onInput={(e) => setTitle(e.currentTarget.value)}
              class="w-full p-2 mb-2 rounded-md bg-[#FFE5D0] placeholder:text-[#5C3F3F]/50 focus:outline-none"
              placeholder="Title"
            />
            <textarea
              value={notes}
              onInput={(e) => setNotes(e.currentTarget.value)}
              class="w-full p-2 rounded-md bg-[#FFE5D0] placeholder:text-[#5C3F3F]/50 focus:outline-none"
              rows={3}
              placeholder="Notes"
            ></textarea>
          </div>

          {/* Error */}
          {error && (
            <div class="text-red-600 text-xs font-semibold mb-2">{error}</div>
          )}

          {/* Footer Buttons */}
          <div class="flex justify-between">
            <button
              onClick={onClose}
              class="px-4 py-2 rounded-md bg-[#FFD6BA] text-[#5C3F3F] text-xs font-semibold hover:bg-[#FFC9A8] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              class="px-4 py-2 rounded-md bg-[#FA9076] text-white text-xs font-semibold hover:bg-[#F78266] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <Calendar
          setSelectedDate={(newDate) => setDate(newDate)}
          closeCalendar={() => setShowCalendar(false)}
          selectedDate={date || ""}
        />
      )}

      {/* Time Picker Modal */}
      {showTimeModal && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div class="bg-[#FFE5D0] text-[#5C3F3F] rounded-xl shadow-2xl w-full max-w-sm p-4 relative">
            <button
              onClick={() => setShowTimeModal(false)}
              class="absolute top-2 right-2 text-[#5C3F3F] text-lg font-bold"
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

      {/* Category Picker Modal */}
      {showCategoryModal && (
        <CategoryModal
          onSelect={(cat) => {
            setCategory(cat);
            setShowCategoryModal(false);
          }}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </>
  );
}
