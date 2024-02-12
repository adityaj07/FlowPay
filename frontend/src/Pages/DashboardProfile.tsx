import { FC } from 'react'
import DashboardHeader from './DashboardHeader'
import { Separator } from "@/components/ui/separator";

interface DashboardProfileProps {
  
}

const DashboardProfile: FC<DashboardProfileProps> = ({}) => {
  return (
  <div>
    <DashboardHeader text='Profile' />
      <Separator className="bg-slate-100/30 my-4" />
  </div>
    )
}

export default DashboardProfile