import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link 
      href={`/pokemon/${pokemon.name}`}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
    >
      <div className="relative w-32 h-32">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          fill
          className="object-contain"
          priority
        />
      </div>
      <h2 className="mt-2 text-xl font-semibold capitalize">{pokemon.name}</h2>
      <div className="mt-4 text-blue-500 hover:text-blue-600">
        Details → 
      </div>
    </Link>
  );
}