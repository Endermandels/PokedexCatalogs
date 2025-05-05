import styles from "@/styles/page.module.css";

// Exports the pokemon table HTML
export default function PokemonTable({ pokemonList }) {
    return (
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
                {pokemonList.map((poke) => (
                    <tr key={poke.id}>
                    <td>{poke.id}</td>
                    <td>{poke.name}</td>
                    <td>{poke.type.join(", ")}</td>
                    <td>{poke.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}