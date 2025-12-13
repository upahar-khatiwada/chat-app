import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route } from "react-router-dom";
import type User from "./interfaces/user_interface";
import PublicRoute from "./components/PublicRoute";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              loading ? (
                <div className="flex items-center justify-center">
                  Loading...
                </div>
              ) : user ? (
                <ProfilePage />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
