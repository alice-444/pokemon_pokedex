"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

type FilterProps = {
  types: string[];
  onFilterChange: (filters: {
    types: string[];
    evolutionStage: number[];
    rarity: string[];
  }) => void;
};

const evolutionStages = [1, 2, 3];
const rarityOptions = ["Commun", "Rare", "Légendaire", "Mythique"];

const PokemonFilters = ({ types, onFilterChange }: FilterProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedEvolution, setSelectedEvolution] = useState<number[]>([]);
  const [selectedRarity, setSelectedRarity] = useState<string[]>([]);

  const toggleFilter = (
    value: string | number,
    category: "types" | "evolutionStage" | "rarity"
  ) => {
    let newSelection;
    switch (category) {
      case "types":
        newSelection = selectedTypes.includes(value as string)
          ? selectedTypes.filter((t) => t !== value)
          : [...selectedTypes, value as string];
        setSelectedTypes(newSelection);
        break;
      case "evolutionStage":
        newSelection = selectedEvolution.includes(value as number)
          ? selectedEvolution.filter((e) => e !== value)
          : [...selectedEvolution, value as number];
        setSelectedEvolution(newSelection);
        break;
      case "rarity":
        newSelection = selectedRarity.includes(value as string)
          ? selectedRarity.filter((r) => r !== value)
          : [...selectedRarity, value as string];
        setSelectedRarity(newSelection);
        break;
    }

    onFilterChange({
      types: newSelection as string[],
      evolutionStage: newSelection as number[],
      rarity: newSelection as string[],
    });
  };

  const FilterSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-6 rounded-2xl bg-white/20 p-4 backdrop-blur-lg">
      <button
        onClick={() => setOpenSection(openSection === title ? null : title)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <motion.div
          animate={{ rotate: openSection === title ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-white" />
        </motion.div>
      </button>
      <AnimatePresence>
        {openSection === title && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Filtres</h2>
        <button
          onClick={() => {
            setSelectedTypes([]);
            setSelectedEvolution([]);
            setSelectedRarity([]);
            onFilterChange({ types: [], evolutionStage: [], rarity: [] });
          }}
          className="flex items-center gap-1 text-white/80 hover:text-white"
        >
          <FiX /> Réinitialiser
        </button>
      </div>

      <FilterSection title="Types">
        {types.map((type) => (
          <motion.label
            key={type}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${
                selectedTypes.includes(type) ? 0.2 : 0.1
              })`,
            }}
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleFilter(type, "types")}
              className="h-4 w-4 accent-white"
            />
            <span className="capitalize text-white">{type}</span>
          </motion.label>
        ))}
      </FilterSection>

      <FilterSection title="Niveau d'évolution">
        {evolutionStages.map((stage) => (
          <motion.label
            key={stage}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${
                selectedEvolution.includes(stage) ? 0.2 : 0.1
              })`,
            }}
          >
            <input
              type="checkbox"
              checked={selectedEvolution.includes(stage)}
              onChange={() => toggleFilter(stage, "evolutionStage")}
              className="h-4 w-4 accent-white"
            />
            <span className="text-white">Évolution {stage}</span>
          </motion.label>
        ))}
      </FilterSection>

      <FilterSection title="Rareté">
        {rarityOptions.map((rarity) => (
          <motion.label
            key={rarity}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${
                selectedRarity.includes(rarity) ? 0.2 : 0.1
              })`,
            }}
          >
            <input
              type="checkbox"
              checked={selectedRarity.includes(rarity)}
              onChange={() => toggleFilter(rarity, "rarity")}
              className="h-4 w-4 accent-white"
            />
            <span className="text-white">{rarity}</span>
          </motion.label>
        ))}
      </FilterSection>
    </div>
  );
};

export default PokemonFilters;
