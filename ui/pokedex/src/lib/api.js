// Handles API calls

export async function fetchPokemon() {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/pokemon`);
    return res.json();
}

export async function addPokemon(pokemon) {
    console.log(pokemon);
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/pokemon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemon)
    });
    return res.json();
}

export async function updatePokemon(pokemon, pokemonId) {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/pokemon/${pokemonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemon)
    });
    return res.json();
}

export async function deletePokemon(pokemonId) {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/pokemon/${pokemonId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return res.json();
}