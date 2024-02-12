import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { FC } from "react";

interface DashboardHeaderProps {
  text?: string;
  user?: User | null;
  handlefn?: () => Promise<void>;
}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  text,
  user,
  handlefn,
}) => {
  const handleLogout = handlefn;

  return (
    <div className="w-full flex justify-between items-center">
      <div>
       
          {user && (
            <h1 className="text-3xl ">
              Welcome back,{" "}
              <span className="font-semibold">{user.firstName} !</span>
            </h1>
          )}

        {text && <h1 className="text-3xl ">{text}</h1>}
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
