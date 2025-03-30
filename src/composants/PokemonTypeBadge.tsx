"use client";

import { motion } from "framer-motion";
import { typeIcons, typeColors, PokemonType } from "@/composants/PokemonTypes";

type Props = {
  type: PokemonType;
  className?: string;
};

const PokemonTypeBadge = ({ type, className = "" }: Props) => {
  const IconComponent = typeIcons[type];
  const colorClass = typeColors[type];

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${colorClass} ${className}`}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span className="capitalize">{type}</span>
    </motion.span>
  );
};

export default PokemonTypeBadge;
