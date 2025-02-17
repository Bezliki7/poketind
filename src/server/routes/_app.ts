import { z } from 'zod';

import { router } from '../trpc';
import { pokemonRouter } from './pokemon/pokemon';

export const appRouter = router({
  pokemon: pokemonRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
