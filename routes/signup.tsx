import { Head } from "$fresh/runtime.ts";
import SignupForm from "../islands/SignupForm.tsx";
import Toast from "../islands/Toast.tsx";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
        `}</style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold mb-4">Sign Up</h1>
        <SignupForm />
        <Toast />
      </div>
    </>
  );
}