import { useEffect, useState } from "preact/hooks";

export default function Transaction() {
  interface TransactionRecord {
    id: number;
    amount: number;
    description: string;
    date: string;
    type: string;
  }

  const [transaction, setTransaction] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    fetch("/api/transaction", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent
    })
      .then((res) => {
        if (res.status === 401) {
          globalThis.location.href = "/login"; // Redirect if unauthorized
        }
        return res.json();
      })
      .then((data) => setTransaction(data))
        .catch((error) => console.error("API Error:", error));
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
        <table>
            <thead>
            <tr>
                <th>Amount</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {transaction.map((record) => (
                <tr key={record.id}>
                <td>{record.amount}</td>
                <td>{record.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>  

    );
}
