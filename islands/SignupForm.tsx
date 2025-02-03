import { useState } from "preact/hooks";
import { toastSignal } from "./Toast.tsx";

export default function SignupForm() {
  // This useState is VALID because it's in an island component
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(await response.text());

      toastSignal.value = {
        message: "Account created successfully! 🎉",
        type: "success"
      };
      form.reset();
    } catch (error) {
      toastSignal.value = {
        message: (error as Error).message,
        type: "error"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
              <div>
            <label class="block mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              required
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              required
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              placeholder = "9204102048"
              pattern="[0-9]{10}"
              required
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              class="w-full p-2 border rounded"
            />
          </div>
      <button
        type="submit"
        disabled={isLoading}
        class={`w-full p-2 rounded ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}