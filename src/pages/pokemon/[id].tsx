import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { GiWeight, GiBodyHeight, GiBattleAxe } from "react-icons/gi";
import PokemonTypeBadge from "@/composants/PokemonTypeBadge";
import { fetchPokemonDetails } from "@/services/pokemonService";
import { PokemonType } from "@/composants/PokemonTypes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: Array<{
    name: string;
    value: number;
  }>;
  abilities: string[];
  species: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=500"
  );
  const paths = data.results.map(
    (pokemon: { name: string; url: string }, index: number) => ({
      params: { id: (index + 1).toString() },
    })
  );
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const rawPokemon = await fetchPokemonDetails(params?.id as string);
    const pokemon: PokemonDetails = {
      ...rawPokemon,
      types: rawPokemon.types.map((t: string) => t as PokemonType),
    };
    return {
      props: { pokemon },
      revalidate: 86400,
    };
  } catch {
    return { notFound: true };
  }
};

const PokemonDetailPage = ({ pokemon }: { pokemon: PokemonDetails }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-100 to-teal-100">
        <div className="h-32 w-32 animate-pulse rounded-full bg-white/30 backdrop-blur-lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-r from-sky-100 to-teal-100 p-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* Lien de retour */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-500 hover:text-blue-800"
          >
            <FiArrowLeft className="text-2xl" />
            <span className="font-semibold">Retour au Pokédex</span>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-white/20 bg-white/30 p-8 shadow-2xl backdrop-blur-lg"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <motion.div variants={itemVariants} className="w-full md:w-1/3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm"
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-full object-contain"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full md:w-2/3">
              <motion.h1
                variants={itemVariants}
                className="mb-6 text-center text-5xl font-bold bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent md:text-left"
              >
                {pokemon.name}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="mb-8 grid grid-cols-2 gap-4"
              >
                <MetricCard
                  icon={<GiBodyHeight className="text-3xl text-blue-500" />}
                  value={`${pokemon.height} m`}
                  label="Taille"
                />
                <MetricCard
                  icon={<GiWeight className="text-3xl text-blue-500" />}
                  value={`${pokemon.weight} kg`}
                  label="Poids"
                />
              </motion.div>

              <Section title="Types">
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-2"
                >
                  {pokemon.types.map((type) => (
                    <PokemonTypeBadge key={type} type={type} />
                  ))}
                </motion.div>
              </Section>

              <Section title="Statistiques">
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3"
                >
                  {pokemon.stats.map((stat) => (
                    <StatCard
                      key={stat.name}
                      name={stat.name}
                      value={stat.value}
                    />
                  ))}
                </motion.div>
              </Section>

              <motion.div
                variants={itemVariants}
                className="grid gap-4 md:grid-cols-2"
              >
                <Section title="Espèce">
                  <p className="capitalize text-gray-700">{pokemon.species}</p>
                </Section>

                <Section title="Capacités">
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                      <span
                        key={ability}
                        className="rounded-full bg-white/50 px-3 py-1 text-lg capitalize text-gray-700 backdrop-blur-sm"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </Section>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <motion.h2
      variants={itemVariants}
      className="mb-3 text-2xl font-semibold text-gray-700"
    >
      {title}
    </motion.h2>
    {children}
  </div>
);

const MetricCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    className="flex flex-col items-center rounded-xl bg-white/50 p-4 backdrop-blur-sm"
  >
    <div className="text-blue-600">{icon}</div>
    <p className="text-2xl font-bold text-gray-700">{value}</p>
    <span className="text-lg text-gray-600">{label}</span>
  </motion.div>
);

const StatCard = ({ name, value }: { name: string; value: number }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    className="rounded-xl bg-white/50 p-4 text-center backdrop-blur-sm"
  >
    <GiBattleAxe className="mx-auto text-2xl text-blue-500" />
    <p className="mt-2 text-xl font-bold text-gray-700">{value}</p>
    <span className="text-sm capitalize text-gray-600">{name}</span>
  </motion.div>
);

export default PokemonDetailPage;
