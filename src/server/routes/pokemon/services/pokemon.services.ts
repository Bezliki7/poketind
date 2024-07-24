import { PrismaClient } from '@prisma/client';

import { prisma } from '@server/utils/prisma';
import { fetchResolver } from '@utils/fetch';

import { BASE_URL, POKEMONS_COUNT } from '../pokemon.constant';

import type { GetPokemonResponsePayload, Pokemon } from '../pokemon.interface';

export class PokemonService {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
    this.initDb();
  }

  public async initDb() {
    const isDbEmpty = !(await this.db.pokemon.findUnique({
      where: {
        id: 1
      }
    }));

    if (isDbEmpty) {
      for (let i = 1; i < POKEMONS_COUNT; i++) {
        const uri = `${BASE_URL}/pokemon/${i}`;

        const response = await fetchResolver<Pokemon>(uri);

        if (response) {
          await this.db.pokemon.create({
            data: {
              name: response.name,
              image: response.sprites.front_default
            }
          });
        }
      }
    }
  }

  public async getPokemon(id: number) {
    const pokemon = await this.db.pokemon.findUnique({
      where: {
        id
      }
    });

    return pokemon;
  }

  public async ratePokemon(id: number, rate: 'like' | 'dislike') {
    if (rate === 'like') {
      await this.db.pokemon.update({ where: { id }, data: { likes: { increment: 1 } } });
    } else {
      await this.db.pokemon.update({ where: { id }, data: { dislikes: { decrement: 1 } } });
    }
  }

  public async getPokemons(): Promise<GetPokemonResponsePayload> {
    const pokemons = await this.db.pokemon.findMany();

    const pokemonWithPercentRate = pokemons
      .map((pokemon) => {
        const rateSum = pokemon.dislikes + pokemon.likes;
        const percentRate = rateSum ? Math.round(pokemon.likes / rateSum) * 100 : 0;

        return {
          ...pokemon,
          percentRate
        };
      })
      .sort((a, b) => {
        const aRateSum = a.dislikes + a.likes;
        const bRateSum = b.dislikes + b.likes;

        if (a.percentRate === b.percentRate) {
          return bRateSum < aRateSum ? -1 : bRateSum > aRateSum ? 1 : 0;
        }
        return b.percentRate - a.percentRate;
      });

    return pokemonWithPercentRate;
  }
}
