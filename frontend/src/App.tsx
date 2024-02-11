import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import PageSkeleton from "./components/ui/skeletons/pageSkeleton";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./Pages/Home"));
const Signup = lazy(() => import("./Pages/Signup"));
const Login = lazy(() => import("./Pages/Login"));
const DashboardLayout = lazy(() => import("./Pages/DashboardLayout"));
const DashboardHome = lazy(() => import("./Pages/DashboardHome"));
const DashboardSettings = lazy(() => import("./Pages/DashboardSettings"));
const DashboardProfile = lazy(() => import("./Pages/DashboardProfile"));
const SendMoney = lazy(() => import("./Pages/SendMoney"));

function App() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <>
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
            <Suspense
              fallback={<PageSkeleton loadingText="Loading Dashboard..." />}
            >
              <DashboardLayout />
            </Suspense>
          }
        >
          <Route path="/dashboard/" element={<DashboardHome />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
        </Route>
        <Route
          path="/send"
          element={
            <Suspense
              fallback={
                <PageSkeleton loadingText="Loading SendMoney page..." />
              }
            >
              <SendMoney />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
