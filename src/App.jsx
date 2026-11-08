
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ArticlesProvider } from "./context/ArticlesContext";

import Navigation from "./components/Navigation";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import SavedArticlesPage from "./pages/SavedArticlesPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <Navigation />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedArticlesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;
