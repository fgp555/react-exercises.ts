import { useState, useEffect } from "react";
import { Pokemon } from "../types/Pokemon"; // Asegúrate de que el tipo esté correctamente definido
import ApiPokemonService from "../services/apiPokemonService";

// Definición de tipos para el estado
interface PokemonDetailsState {
  data: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const usePokemonDetails = (name: string): PokemonDetailsState => {
  const [data, setData] = useState<Pokemon | null>(null); // El tipo es Pokemon o null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await ApiPokemonService.getPokemonByName(name);
        setData(response); // Establecer los detalles del Pokémon
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchPokemonDetails(); // Llamar al servicio para obtener los detalles
    }
  }, [name]);

  return { data, loading, error };
};

export default usePokemonDetails;
