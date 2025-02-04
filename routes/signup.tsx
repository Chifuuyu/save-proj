import { Head } from "$fresh/runtime.ts";
import SignupForm from "../islands/SignupForm.tsx";
import Toast from "../islands/Toast.tsx";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up - FinTrack</title>
        <style>{`
          .auth-bg {
            background: linear-gradient(45deg, #4F46E5 0%, #9333EA 100%);
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
        `}</style>
      </Head>

      <div class="min-h-screen flex flex-col lg:flex-row">
        {/* Left Gradient Section */}
        <div class="lg:w-1/2 auth-bg text-white p-8 lg:p-12">
          <div class="max-w-md mx-auto lg:mt-32">
            <h2 class="text-3xl lg:text-4xl font-bold mb-6">Join FinTrack</h2>
            <p class="text-lg opacity-90 mb-8">
              Start your journey to financial freedom with powerful tools
            </p>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-6 h-6 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                  ✓
                </div>
                <span>Automated expense tracking</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                  ✓
                </div>
                <span>Smart financial goal setting</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mr-4">
                  ✓
                </div>
                <span>Real-time financial insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div class="lg:w-1/2 bg-white flex items-center justify-center p-8">
          <div class="w-full max-w-md">
            <div class="text-center mb-8">
              <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p class="text-gray-600">
                Already have an account?{" "}
                <a href="/login" class="text-purple-600 hover:underline">Login</a>
              </p>
            </div>
            <SignupForm />
            <Toast />
          </div>
        </div>
      </div>
    </>
  );
}