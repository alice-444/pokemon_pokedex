"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { typeIcons, PokemonType, typeColors } from "@/composants/PokemonTypes";

type PokemonCardProps = {
  pokemon: {
    id: number;
    name: string;
    types: PokemonType[];
    image?: string;
  };
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const gifUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="relative flex flex-col items-center rounded-3xl border border-white/20 bg-white/30 p-6 shadow-lg backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
    >
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/20 to-white/5" />

      <div className="relative h-48 w-full">
        <motion.img
          src={gifUrl}
          alt={pokemon.name}
          className="h-full w-full object-contain drop-shadow-[0_10px_8px_rgba(255,255,255,0.3)]"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <h3 className="mt-4 text-center text-2xl font-bold capitalize text-gray-800 backdrop-blur-sm">
        {pokemon.name}
      </h3>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {pokemon.types.map((type) => {
          const IconComponent = typeIcons[type];
          return (
            <motion.span
              key={type}
              className={`flex items-center rounded-full border border-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm ${typeColors[type]}`}
              whileHover={{ scale: 1.1 }}
            >
              {IconComponent && (
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mr-1"
                >
                  <IconComponent className="text-white/80" />
                </motion.span>
              )}
              <span className="text-white/90">{type}</span>
            </motion.span>
          );
        })}
      </div>

      <Link href={`/pokemon/${pokemon.id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 flex items-center rounded-full border border-white/20 bg-blue-500/50 px-4 py-2 text-white/90 transition-all hover:bg-blue-600/60"
        >
          Voir plus <FiArrowRight className="ml-2 text-white/80" />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default PokemonCard;
