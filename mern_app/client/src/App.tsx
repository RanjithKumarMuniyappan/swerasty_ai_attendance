
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import EmployeesPage from '../pages/EmployeesPage';
import Header from '../components/Header';
import { EmployeeProvider } from '../hooks/useEmployees';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <EmployeeProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          {isAuthenticated && <Header onLogout={handleLogout} />}
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/home" />} />
              <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
              <Route path="/employees" element={isAuthenticated ? <EmployeesPage /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </EmployeeProvider>
  );
};

export default App;
