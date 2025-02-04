import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>FinTrack - Smart Money Management</title>
      </Head>
      
      {/* Hero Section */}
      <section class="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-20 px-4">
        <div class="max-w-6xl mx-auto text-center">
          <h1 class="text-5xl font-bold mb-6 leading-tight">
            Take Control of Your Financial Future
          </h1>
          <p class="text-xl mb-8 opacity-90">
            Track expenses, set goals, and optimize your income - all in one powerful platform
          </p>
          <a class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all" href="/signup">
              Get Started Free
            </a>
          
          {/* Stats Preview */}
          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="p-4 bg-white bg-opacity-10 rounded-xl">
              <div class="text-3xl font-bold">1M+</div>
              <div class="text-sm opacity-80">Active Users</div>
            </div>
            <div class="p-4 bg-white bg-opacity-10 rounded-xl">
              <div class="text-3xl font-bold">$10B+</div>
              <div class="text-sm opacity-80">Tracked Annually</div>
            </div>
            <div class="p-4 bg-white bg-opacity-10 rounded-xl">
              <div class="text-3xl font-bold">94%</div>
              <div class="text-sm opacity-80">Success Rate</div>
            </div>
            <div class="p-4 bg-white bg-opacity-10 rounded-xl">
              <div class="text-3xl font-bold">4.9★</div>
              <div class="text-sm opacity-80">App Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-20 px-4 bg-gray-50">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-16">Powerful Features</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4">Expense Tracking</h3>
              <p class="text-gray-600">Automatically categorize transactions and visualize spending patterns with interactive charts</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4">Goal Setting</h3>
              <p class="text-gray-600">Create smart financial goals with progress tracking and milestone notifications</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-4">Income Optimization</h3>
              <p class="text-gray-600">Analyze earning patterns and get personalized recommendations to maximize income</p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section class="py-20 px-4">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl font-bold">Achieve Your Financial Goals</h2>
            <p class="text-gray-600 text-lg">Whether you're saving for a house, planning retirement, or paying off debt - we've got you covered</p>
            <ul class="space-y-4">
              <li class="flex items-center">
                <div class="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white">✓</div>
                Automated savings plans
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white">✓</div>
                Debt payoff calculators
              </li>
              <li class="flex items-center">
                <div class="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white">✓</div>
                Investment tracking
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-purple-100 to-blue-100 h-96 rounded-3xl shadow-lg">
            {/* Add your dashboard image/component here */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="bg-purple-600 text-white py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6">Start Your Financial Journey Today</h2>
          <p class="text-xl mb-8 opacity-90">Join thousands of others who've transformed their financial lives</p>
          <div class="flex justify-center gap-4">
            <a class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all" href="/signup">
              Get Started Free
            </a>
            <a class="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-gray-300 py-12 px-4">
        <div class="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-white font-bold mb-4">FinTrack</h3>
            <p class="text-sm">Empowering financial freedom through smart technology</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Product</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Features</a></li>
              <li><a href="#" class="hover:text-white transition">Pricing</a></li>
              <li><a href="#" class="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">About</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
              <li><a href="#" class="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Privacy</a></li>
              <li><a href="#" class="hover:text-white transition">Terms</a></li>
              <li><a href="#" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          © 2023 FinTrack. All rights reserved.
        </div>
      </footer>
    </>
  );
}