export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonTypeListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}