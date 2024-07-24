import type { Pokemon as BasePokemon } from '@prisma/client';

import { prisma } from '@server/utils/prisma';

import Pokemon from './components/pokemon/pokemon';

export async function getStaticPaths() {
  const pokemons = await prisma.pokemon.findMany();

  const paths = pokemons.map((pokemon) => ({
    params: { id: pokemon.id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const pokemon = await prisma.pokemon.findUnique({ where: { id: +params.id } });

  return { props: { pokemon } };
}

const PokemonWrapper = (props: { pokemon: BasePokemon }) => {
  return <Pokemon {...props.pokemon} />;
};

export default PokemonWrapper;
