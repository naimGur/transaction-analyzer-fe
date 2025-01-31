import { useState, useEffect } from "react";
import { analyzePatterns } from "../api/services";
import { Loader2 } from "lucide-react";

function PatternDetection() {
  const [patterns, setPatterns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const data = await analyzePatterns();
        setPatterns(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patterns?.map((pattern, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {pattern.merchant}
            </h3>
            <div className="mt-1 text-sm text-gray-500">{pattern.type}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm font-medium text-gray-500">Frequency</div>
            <div className="text-gray-900">{pattern.frequency}</div>
          </div>

          <div className="flex-grow">
            <div className="text-sm font-medium text-gray-500">Amount</div>
            <div className="text-2xl font-semibold text-gray-900">
              ${pattern.amount.toFixed(2)}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Next Expected</span>
              <span className="text-sm font-medium">
                {new Date(pattern.next_expected).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">Confidence</span>
              <span className="text-sm font-medium">
                {(pattern.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatternDetection;
