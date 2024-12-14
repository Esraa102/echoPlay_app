import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  LoginPage,
  SignupPage,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";
import { useEffect, ReactNode } from "react";

interface ChildrenType {
  children: ReactNode; // Type for children
}
const ProtectedRoute: React.FC<ChildrenType> = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user?.isVerified === false) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser: React.FC<ChildrenType> = ({ children }) => {
  const { user } = useAuthStore();

  if (user) {
    if (user.isVerified) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(user);
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-black to-[#121286] h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="text-white flex items-center justify-center bg-gradient-to-br from-black to-[#121286] min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
