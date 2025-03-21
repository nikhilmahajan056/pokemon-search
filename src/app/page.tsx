'use client';

import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { SearchForm } from '@/components/SearchForm';
import { PokemonCard } from '@/components/PokemonCard';

export default function Home() {
  const {
    pokemonTypes,
    pokemons,
    loading,
    error,
    selectedType,
    setSelectedType,
    searchTerm,
    setSearchTerm,
  } = usePokemonSearch();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Pokemon Search</h1>
        <SearchForm
          types={pokemonTypes}
          selectedType={selectedType}
          searchTerm={searchTerm}
          onTypeChange={setSelectedType}
          onSearchChange={setSearchTerm}
        />
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
