import { FC } from 'react'
import DashboardHeader from './DashboardHeader'
import { Separator } from "@/components/ui/separator";

interface DashboardSettingsProps {
  
}

const DashboardSettings: FC<DashboardSettingsProps> = ({}) => {
  return (
  <div>
    <DashboardHeader text='Settings' />
      <Separator className="bg-slate-100/30 my-4" />
  </div>
    )
}

export default DashboardSettings