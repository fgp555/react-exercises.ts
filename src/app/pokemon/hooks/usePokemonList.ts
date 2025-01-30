import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon"; // Asegúrate de tener el tipo Pokemon correctamente definido
import ApiPokemonService from "../services/apiPokemonService";

// Definición de tipos para el estado
interface PokeListState {
  data: Pokemon[];
  loading: boolean;
  error: string | null;
}

const usePokemonList = (): PokeListState => {
  const [data, setData] = useState<Pokemon[]>([]); // Asignación del tipo Pokemon[]
  const [loading, setLoading] = useState<boolean>(true); // Tipo booleano
  const [error, setError] = useState<string | null>(null); // Tipo string o null

  useEffect(() => {
    const fetchPokeList = async () => {
      try {
        setLoading(true);
        const response = await ApiPokemonService.getAllPokemons(20, 0); // Llamamos con paginación
        setData(response);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPokeList();
  }, []);

  return { data, loading, error };
};

export default usePokemonList;
