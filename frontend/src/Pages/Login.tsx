import { FC } from "react";
import { motion } from "framer-motion";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Login page
    </motion.div>
  );
};

export default Login;
