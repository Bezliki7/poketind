import { trpc } from '../utils/trps';
import Pokemon from './pokemon';

export default function IndexPage() {
  const hello = trpc.pokemon.getPokemon.useQuery({ id: 1 });

  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return <Pokemon />;
}
