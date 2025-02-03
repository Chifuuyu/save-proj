import { Head } from "$fresh/runtime.ts";
import LoginForm from "../islands/LoginForm.tsx";
import Toast from "../islands/Toast.tsx";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
        `}</style>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
        <Toast />
        <div class="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" class="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}