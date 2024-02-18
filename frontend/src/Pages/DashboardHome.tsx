import { FC, useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import DashboardHeader from "./DashboardHeader";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHomeProps {}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const DashboardHome: FC<DashboardHomeProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get("/user");
      const user = res.data.user;
      setUser(user);
    };

    getUser();
  }, []);

  const {logout} = useAuth()
  const { toast } = useToast();
  // const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axiosInstance.post("/user/logout");

    if (res.status === 200) {
      toast({
        description: "Logged out successfully",
      });
      // navigate("/");
      logout();
    } else {
      toast({
        description: "Error logging out",
      });
    }
  };

  return (
    <div>
      <DashboardHeader user={user} handlefn={handleLogout} />
      <Separator className="bg-slate-100/30 my-4" />
      <UserBalance />
    </div>
  );
};

export default DashboardHome;
