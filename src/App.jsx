import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Import the AuthProvider
// Import the PrivateRoute
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
