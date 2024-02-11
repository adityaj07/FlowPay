import { Home, Settings, User } from 'lucide-react'
import { FC } from 'react'

interface DashboardNavbarProps {
  
}

const dashboardNavLinks = [
    {
        name: "Home",
        link:"/dashboard",
        icon: <Home />,
    },
    {
        name: "Profile",
        link:"/dashboard/profile",
        icon: <User />,
    },
    {
        name: "Settings",
        link:"/dashboard/settings",
        icon: <Settings />,
    },
]

const DashboardNavbar: FC<DashboardNavbarProps> = ({}) => {
  return (
    // Navbar for desktop
  <div className=''>
    

  </div>)
}

export default DashboardNavbar