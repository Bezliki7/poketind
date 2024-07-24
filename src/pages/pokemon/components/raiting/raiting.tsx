import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { trpc } from '@utils/trps';

const Rating = () => {
  const { data: pokemons } = trpc.pokemon.getPokemons.useQuery();
  const router = useRouter();

  if (!pokemons) {
    return;
  }

  const handleClickPokemon = (id: number) => {
    router.push(`pokemon/${id}`);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='my-2 text-blue-500'>
        <Link href='/'>Home</Link>
      </div>

      <div className='gird-cols-1 grid w-full gap-3 px-5 sm:w-[800px] sm:grid-cols-3 '>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className='flex flex-col gap-4 rounded-lg p-3 cursor-pointer'
            onClick={() => handleClickPokemon(pokemon.id)}>
            <div className='h-80 w-100 p-4 rounded-lg bg-gray-900'>
              <div className='flex justify-between'>
                <h2 className='h-2 capitalize'>{pokemon.name}</h2>
                <span>#{pokemon.id}</span>
              </div>

              <div className='item-center flex justify-center'>
                <Image
                  src={pokemon?.image}
                  className='bg-gray-900'
                  alt='pokemon'
                  width={300}
                  height={300}
                />
              </div>

              <div className='flex flex-col'>
                <span>Likes: {pokemon.likes}</span>
                <span>Dislikes: {pokemon.dislikes}</span>
                <span>Percent rate: {pokemon.percentRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
