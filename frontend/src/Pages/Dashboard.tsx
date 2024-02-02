import { FC } from "react";
import { motion } from "framer-motion";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Dashboard
    </motion.div>
  );
};

export default Dashboard;
