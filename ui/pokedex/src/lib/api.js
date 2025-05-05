// Handles API calls

export async function fetchPokemon() {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/pokemon`);
    return res.json();
}

export async function addPokemon(pokemon) {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/pokemon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemon),
    });
    return res.json();
}