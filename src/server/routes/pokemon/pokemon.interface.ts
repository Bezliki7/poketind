import { Pokemon as BasePokemon } from '@prisma/client';

export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

export type GetPokemonResponsePayload = (BasePokemon & {
  percentRate: number;
})[];
