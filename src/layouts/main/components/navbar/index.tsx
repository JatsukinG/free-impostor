import { BiMenu } from 'react-icons/bi'
import { TbPointFilled } from 'react-icons/tb'
import { Button } from '@/components/forms'
import RestaurantDropdown from '@/layouts/main/components/navbar/RestaurantDropdown'
import ToggleDarkModeButton from '@/layouts/main/components/navbar/ToggleDarkModeButton'

const DashboardNavbar = () => {
  return (
      <header
          className="w-full h-[60px] min-h-[60px] bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-700 flex justify-between items-center px-4">
        <Button
            outlined
            icon={BiMenu}
            onClick={() => console.log('close')}
        />
        <div className="flex items-center gap-2">
          <ToggleDarkModeButton/>
          <TbPointFilled className="text-neutral-200 dark:text-neutral-600"/>
          <RestaurantDropdown/>
        </div>
      </header>
  )
}

export default DashboardNavbar