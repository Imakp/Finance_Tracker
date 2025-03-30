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
          {/* Apply base styles: font, background, text color, and transition */}
          <div className="app min-h-screen font-sans bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary transition-colors duration-300">
            <Header />
            {/* Ensure main content area has appropriate padding */}
            <main className="content container mx-auto px-4 py-8">
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
