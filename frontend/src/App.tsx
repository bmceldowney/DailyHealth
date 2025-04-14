/** @format */

import { useHealth } from "./hooks/useHealth";

function App() {
  const { health, loading, error } = useHealth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Backend Health Status</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded ${
              health?.status === "OK"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {health?.status || "Unknown"}
          </span>
        </p>
        <p>
          <span className="font-medium">Message:</span>{" "}
          {health?.message || "No message available"}
        </p>
      </div>
    </div>
  );
}

export default App;
