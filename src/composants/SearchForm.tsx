"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import * as yup from "yup";
import { FiSearch } from "react-icons/fi";

type SearchFormProps = {
  onSearch: (search: string) => void;
  error?: string;
};

const searchSchema = yup
  .string()
  .min(2, "Veuillez entrer au moins 2 caractères")
  .required("Le champ est requis");

const SearchForm = ({ onSearch, error }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await searchSchema.validate(inputValue);
      setLocalError(null);
      onSearch(inputValue);
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        setLocalError(err.message);
      } else {
        setLocalError("Erreur de validation");
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="mb-8"
    >
      <div className="relative mx-auto max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Rechercher un Pokémon..."
          className="w-full rounded-full border-2 border-gray-300 px-6 py-3 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 "
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-blue-400 p-2 text-white transition-colors hover:bg-blue-600"
        >
          <FiSearch className="h-5 w-5" />
        </button>
      </div>
      {(error || localError) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-center text-sm text-red-500"
        >
          {localError || error}
        </motion.p>
      )}
    </motion.form>
  );
};

export default SearchForm;
