import { useState, useEffect } from "react";
import { analyzeMerchants } from "../api/services";
import { Loader2 } from "lucide-react";

function MerchantAnalysis() {
  const [merchants, setMerchants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const data = await analyzeMerchants();
        setMerchants(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
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
      {merchants?.map((merchant, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {merchant.merchant}
            </h3>
            <div className="mt-1 text-sm text-gray-500">
              {merchant.category}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm font-medium text-gray-500">
              Sub Category
            </div>
            <div className="text-gray-900">{merchant.sub_category}</div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-3">
              {merchant.flags.map((flag, flagIndex) => (
                <span
                  key={flagIndex}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Confidence</span>
              <span className="text-sm font-medium">
                {(merchant.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MerchantAnalysis;
