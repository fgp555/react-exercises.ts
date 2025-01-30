import { Link } from "react-router"; // Para crear enlaces a cada Pokémon
import usePokemonList from "./hooks/usePokemonList";

const PokemonListPage = () => {
  // Usar el hook personalizado para obtener los datos de Pokémon
  const { data, loading, error } = usePokemonList();

  // Renderizar diferentes estados según la carga de datos
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <hr />
      <ul>
        {data.length > 0 ? (
          data.map((pokemon) => (
            <li key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </ul>
    </div>
  );
};

export default PokemonListPage;
