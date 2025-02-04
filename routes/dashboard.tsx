import { Head } from "$fresh/runtime.ts";
import Toast from "../islands/Toast.tsx";
// Import the island for the chart
import ChartIsland from "../islands/ChartIsland.tsx";
import AddTransactionDialog from "../islands/AddTransactionDialog.tsx";


const transactions = [
  { id: 1, date: "2023-08-01", description: "Groceries", amount: -125.0, category: "Food" },
  { id: 2, date: "2023-08-02", description: "Salary", amount: 4500.0, category: "Income" },
  { id: 3, date: "2023-08-03", description: "Rent", amount: -1200.0, category: "Housing" },
];

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - FinTrack</title>
        <style>{`
          .dashboard-gradient {
            background: linear-gradient(45deg, #4F46E5 0%, #9333EA 100%);
          }
        `}</style>
      </Head>

      <div class="min-h-screen flex">
        {/* Sidebar */}
        <aside class="hidden lg:block w-64 dashboard-gradient text-white p-6">
          <div class="mb-8">
            <h2 class="text-xl font-bold">FinTrack</h2>
            <p class="text-sm opacity-80">Financial Dashboard</p>
          </div>
          <nav class="space-y-4">
            <a href="#" class="flex items-center gap-2 text-white opacity-80 hover:opacity-100">
              {/* SVG icon */}
              Dashboard
            </a>
            <a href="#" class="flex items-center gap-2 text-white opacity-80 hover:opacity-100">
              {/* SVG icon */}
              Transactions
            </a>
            <a href="#" class="flex items-center gap-2 text-white opacity-80 hover:opacity-100">
              {/* SVG icon */}
              Reports
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main class="flex-1 bg-gray-50 p-8">
          <div class="max-w-7xl mx-auto">
            {/* Header */}
              <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
                <AddTransactionDialog isOpen={true} onClose={() => {}} data-client-load />
              </div>

            {/* Stats Cards */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Your cards here */}
            </div>

            {/* Spending vs Goal Chart */}
            <div class="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h2 class="text-lg font-semibold mb-4">Spending vs Goals</h2>
              {/* Use the ChartIsland component */}
              <ChartIsland data-client-load />
            </div>

            {/* Recent Transactions */}
            <div class="bg-white p-6 rounded-xl shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Recent Transactions</h2>
                <a href="#" class="text-purple-600 hover:underline">View All →</a>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-left text-gray-500 border-b">
                      <th class="pb-3">Date</th>
                      <th class="pb-3">Description</th>
                      <th class="pb-3">Category</th>
                      <th class="pb-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} class="border-b last:border-b-0">
                        <td class="py-4">{transaction.date}</td>
                        <td class="py-4">{transaction.description}</td>
                        <td class="py-4">
                          <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm">
                            {transaction.category}
                          </span>
                        </td>
                        <td
                          class={`py-4 font-medium ${
                            transaction.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Sections */}
            {/* ... */}
          </div>
        </main>
      </div>

      <Toast />
    </>
  );
}
