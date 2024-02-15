import { FC } from 'react'
import DashboardHeader from './DashboardHeader'
import { Separator } from '@/components/ui/separator'
import SearchBar from '@/components/SearchBar'

interface DashboardTransferFundsProps {
  
}

const DashboardTransferFunds: FC<DashboardTransferFundsProps> = ({}) => {
  return (
  <div>
    <DashboardHeader text='Transfer funds' />
      <Separator className="bg-slate-100/30 my-4" />
      <div>
        <SearchBar />
      </div>
  </div>
    )
}

export default DashboardTransferFunds