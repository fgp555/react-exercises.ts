import { apiBaseURL } from "../../../utils/apiBaseURL";
import { Pokemon } from "../types/Pokemon";

class ApiPokemonService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Método para obtener todos los pokemones con paginación
  async getAllPokemons(limit = 20, offset = 0): Promise<Pokemon[]> {
    try {
      const response = await fetch(`${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Mapeamos los resultados a obtener detalles de cada pokemon
      const pokemonList: Pokemon[] = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const details = await this.getPokemonByName(pokemon.name);
          return details;
        })
      );

      return pokemonList;
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  // Método para obtener detalles de un pokemon por su nombre
  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const response = await fetch(`${this.baseURL}/pokemon/${name}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokémon ${name}:`, error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }
}

export default new ApiPokemonService(apiBaseURL);
