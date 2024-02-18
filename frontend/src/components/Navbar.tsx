import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FC, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {}

const menuLinks: {
  trigger: string;
  link: string;
  text: string;
  href: string;
}[] = [
  {
    trigger: "Dashboard",
    link: "Login to access Your FlowPay Dashboard",
    text: "Manage your transactions and finances with ease.",
    href: "/login",
  },
  {
    trigger: "Payments",
    link: "Signup and make Payments with FlowPay",
    text: "Effortlessly send and receive payments securely.",
    href: "/signup",
  },
];


const Navbar: FC<NavbarProps> = ({}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className="flex justify-between items-center border-b border-zinc-600/40 w-[90%] mx-auto h-[4rem] mt-3">
        <div className="flex items-center">
          <Link to="/" className="flex gap-2 justify-center items-center">
            <img src="/assets/logo.png" alt="logo" className="w-[88px] -ml-6" />
            <span className="mr-4 -ml-4 font-bold text-[clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)]">
              FlowPay
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex items-center">
            <NavigationMenuList className="flex items-center">
              {menuLinks.map((menu) => (
                <NavigationMenuItem key={menu.trigger}>
                  <NavigationMenuTrigger className="bg-transparent">
                    {menu.trigger}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className=" p-4 md:w-[200px] lg:w-[300px] ">
                      <li className="row-span-3 hover:shadow-lg transition-shadow duration-150">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to={menu.href}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {menu.link}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {menu.text}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex justify-center items-center gap-4">
          <ModeToggle />
          <div
            onClick={handleNavToggle}
            className="block md:hidden cursor-pointer "
          >
            {isNavOpen ? (
              <X className="block lg:hidden animate-fade-in-out" />
            ) : (
              <Menu className="block lg:hidden animate-fade-in-out " />
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV  */}
      <nav
        className={`mobile-nav fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 lg:hidden transition-opacity z-[45] pt-4 ${
          isNavOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleNavToggle}
        onScroll={handleNavToggle}
      >
        <div className="bg-[#151515] mt-20 md:mt-0 rounded-3xl w-[60%] ml-auto mr-[5%] text-white p-4 text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <ul className="flex flex-col items-center w-full justify-center gap-2 pb-4 transition-transform duration-300 ">
            {menuLinks.map((link) => (
              <Link
                to={link.href}
                className="p-2 px-4 cursor-pointer  transition-colors duration-200 hover:bg-white hover:text-blacks w-full text-center rounded-lg hover:text-black"
                key={link.href}
              >
                <li key={link.trigger}>
                  <Button
                    variant="secondary"
                    className="text-black dark:text-white w-full"
                  >
                    {link.trigger}
                  </Button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
