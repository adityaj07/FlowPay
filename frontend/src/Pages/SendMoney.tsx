import { FC } from "react";
import { motion } from "framer-motion";

interface SendMoneyProps {}

const SendMoney: FC<SendMoneyProps> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      SendMoney page
    </motion.div>
  );
};

export default SendMoney;
