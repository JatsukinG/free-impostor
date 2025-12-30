import Welcome from '@/modules/home/Welcome'
import GameSettings from '@/pages/main/GameSettings'

const HomePage = () => {
  return (
      <div className="w-full flex flex-col gap-8">
        <Welcome/>
        <GameSettings/>
      </div>
  )
}

export default HomePage