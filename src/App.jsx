import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionAnalyzer from "./components/TransactionAnalyzer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
