import { FC } from 'react'
import DashboardHeader from './DashboardHeader'
import { Separator } from '@/components/ui/separator'

interface DashboardTransferFundsProps {
  
}

const DashboardTransferFunds: FC<DashboardTransferFundsProps> = ({}) => {
  return (
  <div>
    <DashboardHeader text='Transfer funds' />
      <Separator className="bg-slate-100/30 my-4" />
  </div>
    )
}

export default DashboardTransferFunds