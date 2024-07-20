import { router, procedure } from '../../trpc';
import getPokemonSchema from './schemas/get-pokemon.schema';

export const pokemonRouter = router({
  getPokemon: procedure.input(getPokemonSchema).query(async (opts) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${opts.input.id}`);
    console.log(response.body);
    return response;
  })
});
