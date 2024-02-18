import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Home, LogOut, Send, Settings, User } from "lucide-react";
import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface DashboardNavbarProps {}

interface NavLink {
  name: string;
  link: string;
  icon: JSX.Element;
}

const dashboardNavLinks: NavLink[] = [
  {
    name: "Home",
    link: "/dashboard/home",
    icon: <Home />,
  },
  {
    name: "Profile",
    link: "/dashboard/profile",
    icon: <User />,
  },
  {
    name: "Transfer",
    link: "/dashboard/transferfunds",
    icon: <Send />,
  },
  {
    name: "Settings",
    link: "/dashboard/settings",
    icon: <Settings />,
  },
];

const DashboardNavbar: FC<DashboardNavbarProps> = ({}) => {
  const { toast } = useToast();
  const {logout} = useAuth();

  const handleLogout = async () => {
    const res = await axiosInstance.post("/user/logout");

    
    if (res.status === 200) {
      logout();
      toast({
        description: "Logged out successfully",
      });
      // navigate("/");
    } else {
      toast({
        description: "Error logging out",
      });
    }
  };
  return (
    <>
    {/* // Navbar for desktop */}
      <nav className="flex-col justify-between items-center px-4 py-2 h-screen hidden lg:flex ">
        <div className="flex flex-col gap-4 w-full">
          <Link
            to="/dashboard/home"
            className="flex gap-2 justify-start items-center"
          >
            <img src="/assets/logo.png" alt="logo" className="w-[88px]" />
            <span className="mr-4 -ml-4 font-bold text-[clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)]">
              FlowPay
            </span>
          </Link>
          <Separator className="-mt-6" />
          {dashboardNavLinks.map((navLink) => (
            <NavLink
              to={navLink.link}
              key={navLink.name}
              className={({ isActive }) =>
                isActive
                  ? "flex justify-start items-center gap-2 px-5 py-3 rounded-lg bg-slate-500/30 hover:bg-slate-500/30 transition-colors duration-150"
                  : "flex justify-start items-center gap-2 px-5 py-3 rounded-lg hover:bg-slate-500/30 transition-colors duration-150"
              }
            >
              {navLink.icon}
              <span>{navLink.name}</span>
            </NavLink>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="w-full mb-8 gap-4"
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </nav>

      {/*  Navbar for mobile/tablet */}
      <nav className="fixed bottom-0 flex justify-around items-center space-x-5 lg:hidden  rounded-tr-2xl rounded-tl-2xl pb-1 w-full bg-slate-500">
        {dashboardNavLinks.map((navLink) => (
          <NavLink
            to={navLink.link}
            key={navLink.name}
            className={({ isActive }) =>
              isActive
                ? "flex justify-center items-center flex-col gap-2 rounded-lg px-2 py-3 bg-slate-900/50  transition-colors duration-200 w-[20%] border-t border-t-zinc-400/50 hover:border-t hover:border-t-zinc-400/50"
                : "flex justify-center items-center flex-col gap-2 rounded-lg px-2 py-3 hover:bg-slate-900/50 transition-colors duration-200 w-[20%]  border-t border-t-zinc-400/50 hover:border-t hover:border-t-zinc-400/50 "
            }
          >
            {navLink.icon}
            <p className="text-[0.70rem] md:text-[0.8rem]">{navLink.name}</p>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default DashboardNavbar;
