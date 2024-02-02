import { FC } from "react";
import { motion } from "framer-motion";

interface SignupProps {}

const Signup: FC<SignupProps> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Signup page
    </motion.div>
  );
};

export default Signup;
