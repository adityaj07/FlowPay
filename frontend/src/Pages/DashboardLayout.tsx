import { FC, lazy } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";


const DashboardNavbar = lazy(() => import("./DashboardNavbar"));

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen"
    >
      <div className="flex">
        <div className="lg:w-[20%]">
          <DashboardNavbar />
        </div>
        <div className="w-full px-4 py-9 h-screen bg-slate-500/30 lg:rounded-tl-[2.5rem] lg:rounded-bl-[2.5rem] border-l border-r-zinc-400/20 ">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
