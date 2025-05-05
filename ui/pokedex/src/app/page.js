import styles from "./page.module.css";

async function getPokemon() {
  const res = await fetch('http://localhost:5000/pokemon');
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon");
  }
  return res.json();
}

export default async function Home() {
  const pokemon = await getPokemon();

  return (
    <main className={styles.main}>
      <h1>Pokedex</h1>
      <p>Welcome!  This app will show and manage Pokemon from your database.</p>
      <table className={styles.table} border="1" >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type(s)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((poke) => (
            <tr key={poke.id}>
              <td>{poke.id}</td>
              <td>{poke.name}</td>
              <td>{poke.type.join(", ")}</td>
              <td>{poke.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
