'use client';

import { useState, useEffect } from 'react';
import { Pokemon, PokemonTypeListResponse } from '@/types/pokemon';
import { getPokemonTypes, searchPokemons, getPokemonByName } from '@/services/pokemon';

export function usePokemonSearch() {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonTypeListResponse['results']>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Pokemon types on mount
  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const typesData = await getPokemonTypes();
        setPokemonTypes(typesData.results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch Pokemon types');
      }
    };
    fetchPokemonTypes();
  }, []);

  // Fetch initial Pokemon list
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const pokemonList = await searchPokemons();
        const detailedPokemons = await Promise.all(
          pokemonList.results.map(({ name } : {name: string}) => getPokemonByName(name))
        );
        setPokemons(detailedPokemons);
        setFilteredPokemons(detailedPokemons);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch Pokemons');
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  // Filter Pokemons based on type and search term
  useEffect(() => {
    let filtered = pokemons;

    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPokemons(filtered);
  }, [selectedType, searchTerm, pokemons]);

  return {
    pokemonTypes,
    pokemons: filteredPokemons,
    loading,
    error,
    selectedType,
    setSelectedType,
    searchTerm,
    setSearchTerm,
  };
}