import type { Pokemon } from '@prisma/client';

export type PokemonProps = {
  pokemon?: Partial<Pokemon>;
};
