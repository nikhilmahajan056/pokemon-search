import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPokemonByName } from '@/services/pokemon';

async function PokemonDetails( {name}: {name: string}) {
  const pokemon = await getPokemonByName(name);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col gap-8 items-center">
        <div className="relative w-64 h-64">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-row">
            <h1 className="text-2xl font-bold mx-2">Name: </h1>
            <h1 className="text-2xl capitalize">{pokemon.name}</h1>
          </div>
          <div className="flex gap-1 flex-row">
            <h1 className="text-2xl font-bold mx-2">Type: </h1>
            {pokemon.types.map((type: { type: { name: string }}, index: number) => (
              <div key={type.type.name}>
                {type.type.name}{index < pokemon.types.length - 1 && ','}
              </div>
            ))}
          </div>
          <div className="space-y-2 flex gap-1 flex-row flex-wrap">
            <h2 className="text-2xl font-bold mx-2">Stats:</h2>
              {pokemon.stats.map((stat: {stat: {name: string}}, index: number) => (
                <div key={stat.stat.name}>
                  <div>{stat.stat.name}{index < pokemon.stats.length - 1 && ','}</div>
                </div>
              ))}
          </div>
          <div className="space-y-2 flex gap-1 flex-row flex-wrap">
            <h2 className="text-2xl font-bold mx-2">Abilities:</h2>
              {pokemon.abilities.map((ability: {ability: {name: string}}, index: number) => (
                <div key={ability.ability.name}>
                  {ability.ability.name}{index < pokemon.abilities.length - 1 && ','}
                </div>
              ))}
          </div>
          <div className="space-y-2 flex gap-1 flex-row flex-wrap">
            <h2 className="text-2xl font-bold mx-2">Moves:</h2>
              {pokemon.moves.map((move: {move: {name: string}}, index: number) => (
                <div key={move.move.name}>
                  {move.move.name}{index < pokemon.moves.length - 1 && ','}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Page({params}: {params: Promise<{name: string}>}) {

  const {name} = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>→</li>
            <li className="capitalize">{name}</li>
          </ol>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <PokemonDetails name={name} />
        </Suspense>
      </div>
    </div>
  );
}