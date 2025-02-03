import { Head } from "$fresh/runtime.ts";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold mb-4">Sign Up</h1>
        <form method="POST" action="/api/signup" class="space-y-4">
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
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
