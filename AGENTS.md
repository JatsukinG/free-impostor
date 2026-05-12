# AGENTS.md - Free Impostor Game

This file contains comprehensive guidelines for agentic coding agents working on the Free Impostor React application.

## Build & Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run lint` - Run ESLint on all TypeScript/React files
- `npm run preview` - Preview production build locally

### Testing
Currently no test framework is configured. When adding tests:
- Consider Jest + React Testing Library for unit/integration tests
- Place test files alongside source files with `.test.tsx` or `.spec.tsx` suffix
- Run tests with `npm test` (to be configured)

## Project Architecture

### Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Jotai (atomic state management)
- **Routing**: React Router v7
- **Forms**: Formik + Yup validation
- **Modals**: @ebay/nice-modal-react
- **UI Components**: Headless UI + custom components

### Directory Structure
```
src/
├── atoms/           # Jotai state atoms
├── components/      # Reusable UI components
│   ├── buttons/     # Button components
│   ├── dialogs/     # Modal/dialog components
│   ├── forms/       # Form components
│   ├── loaders/     # Loading components
│   ├── misc/        # Miscellaneous utilities
│   └── text/        # Typography components
├── constants/       # Application constants
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── modules/         # Feature-specific components
├── pages/           # Route-level components
├── router/          # Router configuration
└── types/           # TypeScript type definitions
```

## Code Style Guidelines

### Import Organization
Follow this import order:
1. React and core library imports
2. Third-party library imports (grouped by library)
3. Internal imports using path aliases
4. Type imports (use `import type` when possible)

```typescript
// React/core
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Third-party
import { RouterProvider } from 'react-router-dom'
import NiceModal from '@ebay/nice-modal-react'

// Internal aliases
import router from '@/router'
import { gameSettingsState } from '@/atoms/gameSettingsState'

// Types
import type { FC, PropsWithChildren } from 'react'
import type { GameSettings } from '@/types'
```

### Path Aliases
Use configured path aliases for clean imports:
- `@/` → `src/`
- `@atoms` → `src/atoms/index`
- `@components` → `src/components/index`
- `@constants` → `src/constants/index`
- `@hooks` → `src/hooks/index`
- `@layouts` → `src/layouts/index`
- `@gql` → `src/gql/index` (for future GraphQL use)
- `@types` → `src/gql/graphql`
- `@snippets` → `src/snippets/index`

### Component Conventions
1. **File Structure**: Each component in its own directory with `index.ts` for exports
2. **Naming**: Use PascalCase for components, camelCase for hooks/utilities
3. **Props**: Define interfaces for all component props
4. **Default Exports**: Use default exports for components, named exports for utilities

```typescript
// Component file
interface Props extends PropsWithChildren {
  as?: 'p' | 'span' | 'div'
  className?: string
  color?: TextColor
}

const Text: FC<Props> = ({ children, ...props }) => {
  // Implementation
}

export default Text

// Index file
export { default as Text } from './Text'
```

### TypeScript Guidelines
- Enable strict mode with `noUnusedLocals` and `noUnusedParameters`
- Use `FC<PropsWithChildren<Props>>` for function components
- Define types in separate `types.ts` files when complex
- Use proper typing for all state and props
- Prefer `import type` for type-only imports

### State Management with Jotai
- Create atoms for all shared state
- Use `atomWithStorage` for persistent state
- Create custom hooks to encapsulate atom logic
- Follow naming pattern: `XState` for atoms, `useX` for hooks

```typescript
// Atom
export const gameSettingsState = atomWithStorage<GameSettings>(
  'gameSettings',
  defaultGameSettings,
)

// Hook
const useGameSettings = () => {
  const [gameSettings, setGameSettings] = useAtom(gameSettingsState)
  
  const updatePlayers = (players: string[]) => {
    setGameSettings(prev => ({ ...prev, players }))
  }
  
  return { gameSettings, updatePlayers }
}
```

### Styling with Tailwind CSS
- Use Tailwind classes for all styling
- Prefer `clsx` for conditional class combinations
- Create utility classes for common patterns
- Use semantic HTML elements with appropriate styling

### Form Handling
- Use Formik for form state management
- Use Yup for validation schemas
- Create reusable form components
- Handle form submission with proper error handling

### Error Handling
- Use proper TypeScript error types
- Implement error boundaries for React components
- Handle async operations with try-catch blocks
- Provide user-friendly error messages

## Development Workflow

### Before Making Changes
1. Run `npm run lint` to check code quality
2. Run `npm run build` to ensure TypeScript compilation
3. Review existing patterns in the codebase

### After Making Changes
1. Run `npm run lint` to verify code style
2. Run `npm run build` to catch TypeScript errors
3. Test functionality in development server

## ESLint Configuration
- Uses TypeScript ESLint recommended rules
- Includes React hooks and refresh plugins
- Extends Vite-specific configurations
- Enforces strict TypeScript checking

## Game Concept

El juego del Impostor es un juego de deducción social donde:

- A todos los jugadores se les da la misma palabra secreta
- A uno o pocos jugadores no se les da la palabra: esos son los impostores
- Por turnos, cada jugador dice una palabra relacionada con la palabra secreta
- Los impostores deben inventar pistas sin saber la palabra, basándose en lo que dicen los demás
- Al final, el grupo discute y vota quién cree que es el impostor

🎯 **Objetivo:**
- 👥 Jugadores normales: descubrir al impostor
- 🕵️ Impostor(es): no ser descubierto y adivinar de qué trata la palabra

🧠 **Por qué es divertido:**
Porque nadie puede ser demasiado obvio, pero tampoco muy vago… y los impostores tienen que improvisar con lo que oyen. Ahí salen las risas y las sospechas 😂

**Flujo del juego actual:**
1. Se seleccionan los jugadores participantes y la cantidad de impostores
2. Se inicia el juego y se muestra el rol y la palabra a cada jugador
3. Los jugadores dan pistas por turnos
4. Se vota a un jugador sospechoso
5. El juego indica si era impostor o no
6. El juego finaliza cuando se descubren todos los impostores

## Notes
- No test framework currently configured
- GraphQL setup exists but not actively used
- Spanish language used for some UI text
- Game supports player management and impostor selection
- Uses localStorage for persistence via Jotai
- Words and clues stored in `src/constants/words.json`

Para la mayoria de todos los textos que se agregan, se deb usar el componente global Text, en lugar de poner etiquetas de texto
para la creacion de clases que tengan arto texto se debe usar clsx en lugar de template literals con backticks