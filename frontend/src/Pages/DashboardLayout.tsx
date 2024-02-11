import { FC, lazy } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { Outlet, useNavigate } from "react-router-dom";
const DashboardNavbar = lazy(() => import("./DashboardNavbar"));

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axiosInstance.post("/user/logout");

    if (res.status === 200) {
      toast({
        description: "Logged out successfully",
      });
      navigate("/");
    } else {
      toast({
        description: "Error logging out",
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen"
    >
      <div className="grid grid-cols-2">
        <div className="w-1/3">
          <DashboardNavbar />
        </div>
        <div className="w-2/3">
          <Outlet />
        </div>
      </div>

      {/* <Button variant="destructive" onClick={handleLogout}>
      Logout
      </Button> */}
    </motion.div>
  );
};

export default Dashboard;
