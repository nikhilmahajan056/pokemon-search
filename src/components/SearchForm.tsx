import { PokemonTypeListResponse } from '@/types/pokemon';

interface SearchFormProps {
  types: PokemonTypeListResponse['results'];
  selectedType: string;
  searchTerm: string;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
}

export function SearchForm({
  types,
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}: SearchFormProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Pokemon..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}