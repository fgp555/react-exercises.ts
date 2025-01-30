import { NavLink, useParams } from "react-router"; // Para obtener el nombre del Pokémon de la URL
import usePokemonDetails from "../hooks/usePokemonDetails"; // Asegúrate de importar el hook correctamente

const PokemonDetailsPage = () => {
  const { name } = useParams<{ name: string }>(); // Obtener el nombre desde la URL
 
  if (!name) return <div>No Pokémon name provided.</div>; // Add a null check

  const { data, loading, error } = usePokemonDetails(name ?? ''); // Use the nullish coalescing operator to provide a default value


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!data) return <div>No Pokémon details found.</div>;

  return (
    <div>
      <NavLink to="/pokemon">Back to list</NavLink>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Height: {data.height} decimeters</p>
      <p>Weight: {data.weight} hectograms</p>
      <h3>Types:</h3>
      <ul>
        {data.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>
      {/* Puedes agregar más detalles sobre el Pokémon según lo necesites */}
    </div>
  );
};

export default PokemonDetailsPage;
