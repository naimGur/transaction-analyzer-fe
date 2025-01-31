function MetricsPanel({ metrics }) {
  const { totalSpend, transactions, avgTransaction, merchants } = metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">$</span>
          <div>
            <p className="text-sm text-gray-500">Total Spend</p>
            <p className="text-2xl font-semibold">{totalSpend.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          <div>
            <p className="text-sm text-gray-500">Transactions</p>
            <p className="text-2xl font-semibold">{transactions}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-sm text-gray-500">Avg. Transaction</p>
            <p className="text-2xl font-semibold">
              ${avgTransaction.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏪</span>
          <div>
            <p className="text-sm text-gray-500">Merchants</p>
            <p className="text-2xl font-semibold">{merchants}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsPanel;
