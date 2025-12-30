import { atomWithStorage } from 'jotai/utils'

export const gameState = atomWithStorage<object | null>('gameState', null)