import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import PageSkeleton from "./components/ui/skeletons/pageSkeleton";
const Home = lazy(() => import("./Pages/Home"));
const Signup = lazy(() => import("./Pages/Signup"));
const Login = lazy(() => import("./Pages/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const SendMoney = lazy(() => import("./Pages/SendMoney"));

function App() {
  return (
    <>
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
              <Dashboard />
            </Suspense>
          }
        />
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
