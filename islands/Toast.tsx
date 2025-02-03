import { useEffect, useState } from "preact/hooks";
import { signal } from "@preact/signals";

export const toastSignal = signal<{
  message: string;
  type: "success" | "error";
} | null>(null);

export default function Toast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastSignal.value) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        toastSignal.value = null;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastSignal.value]);

  if (!isVisible || !toastSignal.value) return null;

  return (
    <div class={`
      fixed bottom-4 right-4 p-4 rounded-md shadow-lg
      ${toastSignal.value.type === "success" 
        ? "bg-green-500" 
        : "bg-red-500"}
      text-white animate-fade-in-up
    `}>
      {toastSignal.value.message}
    </div>
  );
}