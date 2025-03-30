import axios from "axios";
import * as yup from "yup";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const pokemonSchema: yup.Schema<Pokemon> = yup.object().shape({
  name: yup.string().required(),
  url: yup.string().url().required(),
});

const pokemonListResponseSchema: yup.Schema<PokemonListResponse> = yup
  .object()
  .shape({
    count: yup.number().required(),
    next: yup.string().nullable().default(null),
    previous: yup.string().nullable().default(null),
    results: yup.array().of(pokemonSchema).required(),
  });

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: Array<{
    name: string;
    value: number;
  }>;
  abilities: string[];
  species: string;
}

interface PokemonTypeResponse {
  type: { name: string };
}

interface PokemonStatResponse {
  stat: { name: string };
  base_stat: number;
}

interface PokemonAbilityResponse {
  ability: { name: string };
}

export async function fetchPokemons(
  limit = 500,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
    params: { limit, offset },
  });

  const validatedData = await pokemonListResponseSchema.validate(
    response.data,
    { abortEarly: false }
  );
  return validatedData;
}

export async function fetchPokemonDetails(id: string): Promise<PokemonDetails> {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    id: response.data.id,
    name: response.data.name,
    image: response.data.sprites.other["official-artwork"].front_default,
    types: response.data.types.map((t: PokemonTypeResponse) => t.type.name),
    height: response.data.height / 10,
    weight: response.data.weight / 10,
    stats: response.data.stats.map((stat: PokemonStatResponse) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    abilities: response.data.abilities.map(
      (a: PokemonAbilityResponse) => a.ability.name
    ),
    species: response.data.species.name,
  };
}
