import { FC, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { Separator } from "@/components/ui/separator";
import SearchBar from "@/components/SearchBar";
import TransferMoneyCard from "@/components/TransferMoneyCard";

interface DashboardTransferFundsProps {}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const DashboardTransferFunds: FC<DashboardTransferFundsProps> = ({}) => {
  // const [user, setUser] = useState<User | null>(null);
  const [recepient, setRecepient] = useState<User | null >(null);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const res = await axiosInstance.get("/user");
  //     const user = res.data.user;
  //     console.log(user);
  //     setUser(user);
  //   };

  //   getUser();
  // }, []);

  return (
    <div>
      <DashboardHeader text="Transfer funds" />
      <Separator className="bg-slate-100/30 my-4" />

      <SearchBar setRecepient={setRecepient}/>

      <div>
        <div className="flex flex-col gap-2 mb-5 md:mb-5">
          <h2 className="mt-4 md:mt-12  text-2xl font-normal ">
            Transfer Money
          </h2>
          <p className="text-muted-foreground text-sm">
            You can search for users whom you want to transfer money or enter
            the recepient details.
          </p>
        </div>
        <TransferMoneyCard recepient={recepient}/>
      </div>
    </div>
  );
};

export default DashboardTransferFunds;
