"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPokemons } from "@/services/pokemonService";
import PokemonCard from "@/composants/PokemonCard";
import SearchForm from "@/composants/SearchForm";
import * as yup from "yup";
import { PokemonType } from "@/composants/PokemonTypes";

type PokemonDetail = {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
};

const searchSchema = yup.string().min(3, "Minimum 3 caractères requis");

const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchPokemons();
        const pokemonData: PokemonDetail[] = await Promise.all(
          response.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.other["official-artwork"].front_default,
              types: data.types.map(
                (t: { type: { name: string } }) => t.type.name as PokemonType
              ),
            };
          })
        );
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } catch (err: unknown) {
        let message = "Erreur de chargement des Pokémon";
        if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    try {
      await searchSchema.validate(searchTerm);
      setSearchError("");
      const filtered = pokemons.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        setSearchError(err.message);
      } else if (err instanceof Error) {
        setSearchError(err.message);
      } else {
        setSearchError("Erreur de validation");
      }
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-64 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-rose-100 p-6">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-5xl font-extrabold bg-gradient-to-r from-teal-200 to-blue-500 bg-clip-text text-transparent"
        >
          Pokédex
        </motion.h1>

        <div className="mb-12">
          <SearchForm onSearch={handleSearch} error={searchError} />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPokemons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-gray-500 text-xl font-semibold"
          >
            Aucun Pokémon trouvé
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
