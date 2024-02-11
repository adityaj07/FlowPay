import axiosInstance from "@/api/axiosInstance";
import { FC, useEffect, useState } from "react";

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

  return (
    <div className="w-full">
      {user && <h1 className="text-3xl ">Welcome back, <span className="font-semibold">{user.firstName} !
        </span></h1>}
    </div>
  );
};

export default DashboardHeader;
