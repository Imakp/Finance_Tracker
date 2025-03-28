import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MonthlyDetail from "./pages/MonthlyDetail";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MonthsProvider } from "./contexts/MonthsContext";
import { MonthlyDetailProvider } from "./contexts/MonthlyDetailContext"; // Import the new provider

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
                {/* Wrap MonthlyDetail route with its provider */}
                <Route
                  path="/:year/:month"
                  element={
                    <MonthlyDetailProvider>
                      <MonthlyDetail />
                    </MonthlyDetailProvider>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </MonthsProvider>
    </ThemeProvider>
  );
}

export default App;
