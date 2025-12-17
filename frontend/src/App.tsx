import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";
import { Routes, Route } from "react-router";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <AuthProvider>
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
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<SignInPage />} />
        </Routes>
        <div>
          <Toaster />
        </div>
      </AuthProvider>
    </>
  );
};

export default App;
