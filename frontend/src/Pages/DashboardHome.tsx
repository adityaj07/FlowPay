import { FC } from "react";
import UserBalance from "../components/UserBalance";
import DashboardHeader from "./DashboardHeader";
import { Separator } from "@/components/ui/separator";

interface DashboardHomeProps {}

const DashboardHome: FC<DashboardHomeProps> = ({}) => {
  return (
    <div>
      <DashboardHeader />
      <Separator className="bg-slate-100/30 my-4" />
      <UserBalance />
    </div>
  );
};

export default DashboardHome;
