export type Category = 'animals' | 'food'

export interface GameSettings {
  players: string[]
  impostors: number
  categories: Category[]
  time: number
}