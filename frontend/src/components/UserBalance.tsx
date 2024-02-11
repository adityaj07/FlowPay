import axiosInstance from "@/api/axiosInstance";
import { FC, useEffect, useState } from "react";

interface UserBalanceProps {}

const UserBalance: FC<UserBalanceProps> = ({}) => {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    const getBalance = async () => {
      const res = await axiosInstance.get("/account/balance");
      const balance = res.data.balance;
      setBalance(balance);
    };
    getBalance();
  }, []);

  return (
    <>
      <div className="bg-background w-full p-8 rounded-lg relative overflow-hidden">
        <h1 className="text-lg">
          Your available balance is
        </h1>
        <p className="font-black text-6xl mt-3 ">₹ {balance.toFixed(2)}</p>
        <img
          src="/assets/ttten.svg"
          alt="pattern"
          className="absolute top-0 -right-[11rem] md:left-[15rem] lg:left-[40rem] gradient-mask-l-0 "
        />
      </div>
    </>
  );
};

export default UserBalance;
