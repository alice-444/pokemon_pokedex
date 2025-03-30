import {
  GiFlamer,
  GiWaterDrop,
  GiPlantRoots,
  GiLightningStorm,
  GiCrystalBall,
  GiSnowflake2,
  GiDragonHead,
  GiNightSleep,
  GiFairyWings,
  GiPunch,
  GiWingedSword,
  GiPoisonBottle,
  GiEarthSpit,
  GiStoneBlock,
  GiBugNet,
  GiGhost,
  GiGearHammer,
} from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa";
import { IconType } from "react-icons";

export type PokemonType =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel";

export const typeIcons: Record<PokemonType, IconType> = {
  fire: GiFlamer,
  water: GiWaterDrop,
  grass: GiPlantRoots,
  electric: GiLightningStorm,
  psychic: GiCrystalBall,
  ice: GiSnowflake2,
  dragon: GiDragonHead,
  dark: GiNightSleep,
  fairy: GiFairyWings,
  normal: FaRegCircle,
  fighting: GiPunch,
  flying: GiWingedSword,
  poison: GiPoisonBottle,
  ground: GiEarthSpit,
  rock: GiStoneBlock,
  bug: GiBugNet,
  ghost: GiGhost,
  steel: GiGearHammer,
};

export const typeColors: Record<PokemonType, string> = {
  fire: "bg-red-500/80 text-white",
  water: "bg-blue-500/80 text-white",
  grass: "bg-green-500/80 text-white",
  electric: "bg-yellow-400/80 text-gray-800",
  psychic: "bg-purple-500/80 text-white",
  ice: "bg-cyan-400/80 text-gray-800",
  dragon: "bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white",
  dark: "bg-gray-800/80 text-white",
  fairy: "bg-pink-300/80 text-gray-800",
  normal: "bg-gray-300/80 text-gray-800",
  fighting: "bg-orange-700/80 text-white",
  flying: "bg-gradient-to-r from-blue-300/80 to-blue-100/80 text-gray-800",
  poison: "bg-purple-700/80 text-white",
  ground: "bg-yellow-600/80 text-white",
  rock: "bg-yellow-800/80 text-white",
  bug: "bg-lime-500/80 text-white",
  ghost: "bg-indigo-800/80 text-white",
  steel: "bg-gray-400/80 text-gray-800",
};
