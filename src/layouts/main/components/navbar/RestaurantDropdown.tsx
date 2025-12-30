import { BiStore } from 'react-icons/bi'
import { Text } from '@components'

const RestaurantDropdown = () => {
  return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 shrink-0 bg-gray-200 rounded-lg grid place-items-center text-xl text-gray-500">
          <BiStore/>
        </div>
        <Text weight="medium">Parking</Text>
      </div>
  )
}

export default RestaurantDropdown