import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get("/user");
      const user = res.data.user;
      console.log(user);
      setUser(user);
    };

    getUser();
  }, []);

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
    <div className="w-full flex justify-between items-center py-4">
      <div>
        {user && (
          <h1 className="text-3xl ">
            Welcome back,{" "}
            <span className="font-semibold">{user.firstName} !</span>
          </h1>
        )}
      </div>
      <Button
        variant="secondary"
        onClick={handleLogout}
        className="w-[7rem] md:w-[10rem] gap-4 hover:bg-slate-400/50 lg:hidden"
      >
        <LogOut />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
