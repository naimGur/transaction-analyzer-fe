import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Upload, Loader2 } from "lucide-react";
import MetricsPanel from "./MetricsPanel";
import MerchantAnalysis from "./MerchantAnalysis";
import PatternDetection from "./PatternDetection";
import { uploadCSV } from "../api/services";

function TransactionAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      await uploadCSV(file);
      setFileUploaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Transaction Analyzer
          </h1>
          <label className="bg-black text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Upload size={20} />
            )}
            Upload CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={loading}
            />
          </label>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {fileUploaded && (
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex justify-center space-x-4 border-b mb-6">
              <Tab
                className={({ selected }) =>
                  `px-6 py-2 font-medium ${
                    selected
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500"
                  }`
                }
              >
                Merchants
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-6 py-2 font-medium ${
                    selected
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500"
                  }`
                }
              >
                Patterns
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                <MerchantAnalysis />
              </Tab.Panel>
              <Tab.Panel>
                <PatternDetection />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </div>
  );
}

export default TransactionAnalyzer;
