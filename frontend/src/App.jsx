import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MonthlyDetail from "./pages/MonthlyDetail";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MonthsProvider } from "./contexts/MonthsContext";

function App() {
  return (
    <ThemeProvider>
      <MonthsProvider>
        <Router>
          <div className="app min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <main className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:year/:month" element={<MonthlyDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </MonthsProvider>
    </ThemeProvider>
  );
}

export default App;
