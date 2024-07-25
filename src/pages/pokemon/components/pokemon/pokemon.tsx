import Image from 'next/image';
import Link from 'next/link';

import { POKEMONS_COUNT } from '@server/routes/pokemon/pokemon.constant';

import { trpc } from '@utils/trps';
import { getRandomInt } from '@utils/math';
import { Button } from '@components';

import type { PokemonProps } from './pokemon.interface';

const Pokemon = ({ pokemon }: PokemonProps) => {
  const randomInt = getRandomInt(POKEMONS_COUNT);
  const { data: randomPokemon } = trpc.pokemon.getPokemon.useQuery({ id: randomInt });
  const ratePokemonQuery = trpc.pokemon.ratePokeon.useMutation();

  const currentPokemon = pokemon ?? randomPokemon;

  const handleRate = (rate: 'like' | 'dislike') => {
    if (currentPokemon?.id) {
      ratePokemonQuery.mutate({ id: currentPokemon.id, rate });
    }
  };

  return (
    <section className='flex h-screen justify-center items-center flex-col'>
      <div className='h-auto w-100 p-4 rounded-lg bg-gray-800'>
        <div className='flex justify-between'>
          <h2 className='h-2 capitalize'>{currentPokemon?.name ?? 'pokemon'}</h2>
          <span>#{currentPokemon?.id ?? 0}</span>
        </div>

        {currentPokemon?.image ? (
          <Image
            src={currentPokemon?.image}
            className='bg-gray-800'
            alt='pokemon'
            width={300}
            height={300}
          />
        ) : (
          <div style={{ width: 300, height: 300 }} />
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
