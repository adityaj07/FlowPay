import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import PageSkeleton from "./components/ui/skeletons/pageSkeleton";
import Navbar from "./components/Navbar";
import DashboardTransferFunds from "./Pages/DashboardTransferFunds";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./Pages/Home"));
const Signup = lazy(() => import("./Pages/Signup"));
const Login = lazy(() => import("./Pages/Login"));
const DashboardLayout = lazy(() => import("./Pages/DashboardLayout"));
const DashboardHome = lazy(() => import("./Pages/DashboardHome"));
const DashboardSettings = lazy(() => import("./Pages/DashboardSettings"));
const DashboardProfile = lazy(() => import("./Pages/DashboardProfile"));

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <AuthProvider>
      {isLandingPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={<PageSkeleton loadingText="Loading FlowPay..." />}
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense
              fallback={<PageSkeleton loadingText="Loading Signup page..." />}
            >
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={<PageSkeleton loadingText="Loading Login page..." />}
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard/home"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={<PageSkeleton loadingText="Loading Home..." />}
                >
                  <DashboardHome />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={<PageSkeleton loadingText="Loading Profile..." />}
                >
                  <DashboardProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/transferfunds"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={
                    <PageSkeleton loadingText="Loading Transfer funds..." />
                  }
                >
                  <DashboardTransferFunds />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <Suspense
                  fallback={<PageSkeleton loadingText="Loading Settings..." />}
                >
                  <DashboardSettings />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
