import { trpc } from '../utils/trps';

export default function IndexPage() {
  const hello = trpc.pokemon.getPokemon.useQuery({ id: 1 });
  console.log(hello.data);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.body?.locked}</p>
    </div>
  );
}
