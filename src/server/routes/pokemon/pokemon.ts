import { router, procedure } from '../../trpc';
import getPokemonSchema from './schemas/get-pokemon.schema';
import ratePokemonSchema from './schemas/rate-pokemon.schema';
import { PokemonService } from './services/pokemon.services';

const pokemon = new PokemonService();

export const pokemonRouter = router({
  getPokemon: procedure.input(getPokemonSchema).query(async (opts) => {
    const res = await pokemon.getPokemon(opts.input.id);

    return res;
  }),
  ratePokeon: procedure.input(ratePokemonSchema).mutation(async (opts) => {
    await pokemon.ratePokemon(opts.input.id, opts.input.rate);
  })
});
