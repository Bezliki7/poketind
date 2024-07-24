import Image from 'next/image';
import Link from 'next/link';

import type { Pokemon as BasePokemon } from '@prisma/client';

import { POKEMONS_COUNT } from '@server/routes/pokemon/pokemon.constant';

import { trpc } from '@utils/trps';
import { getRandomInt } from '@utils/math';
import { Button } from '@components';

const Pokemon = (props: Partial<BasePokemon>) => {
  const randomInt = getRandomInt(POKEMONS_COUNT);
  const { data: pokemon } = trpc.pokemon.getPokemon.useQuery({ id: props?.id ?? randomInt });
  const ratePokemonQuery = trpc.pokemon.ratePokeon.useMutation();

  const handleRate = (rate: 'like' | 'dislike') => {
    if (pokemon?.id) {
      ratePokemonQuery.mutate({ id: pokemon?.id, rate });
    }
  };

  return (
    <section className='flex h-screen justify-center items-center flex-col'>
      <div className='h-auto w-100 p-4 rounded-lg bg-gray-800'>
        <div className='flex justify-between'>
          <h2 className='h-2 capitalize'>{pokemon?.name}</h2> <span>#{pokemon?.id}</span>
        </div>

        {pokemon?.image && (
          <Image
            src={pokemon?.image}
            className='bg-gray-800'
            alt='pokemon'
            width={300}
            height={300}
          />
        )}

        <div className='flex gap-3'>
          <Button onClick={() => handleRate('like')}>Like</Button>
          <Button onClick={() => handleRate('dislike')}>Dislike</Button>
        </div>
      </div>

      <div className='mt-10 text-blue-500'>
        <Link href='/raiting'>Rating</Link>
      </div>
    </section>
  );
};

export default Pokemon;
