import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home: FC = () => {
  return (
    <motion.div
      className="flex gap-2 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button asChild>
        <Link to="/signup">Signup</Link>
      </Button>
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
    </motion.div>
  );
};

export default Home;
