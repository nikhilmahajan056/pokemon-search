const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonTypes() {
  const response = await fetch(`${POKE_API_BASE_URL}/type`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon types');
  }
  return response.json();
}

export async function searchPokemons() {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemons');
  }
  return response.json();
}

export async function getPokemonByName(name: string) {
  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${name}`);
  }
  return response.json();
}

export async function getPokemonsByType(type: string) {
  const response = await fetch(`${POKE_API_BASE_URL}/type/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemons of type: ${type}`);
  }
  return response.json();
}