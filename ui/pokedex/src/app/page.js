"use client"; // enables React hooks and interactivity in the component

import { useState, useEffect } from "react";
import styles from "@/styles/page.module.css";
import { fetchPokemon, addPokemon } from "@/lib/api";
import NewPokemonForm from "@/components/NewPokemonForm";
import PokemonTable from "@/components/PokemonTable";

export default function Home() {
  // useState triggers a re-render, whereas changing a variable does not 
  const [pokemonList, setPokemonList] = useState([]); // setting the pokemon list
  const [newPokemon, setNewPokemon] = useState({ name: "", type: "", description: "" }); // setting the new pokemon
  const [showForm, setShowForm] = useState(false); // basically a toggle

  // Called upon rendering the Home page
  useEffect(() => {
    fetchPokemon().then(setPokemonList); // Updates the pokemonList upon fetching the pokemon data
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = { ...newPokemon, type: newPokemon.type.split(",").map(t => t.trim()) }; // reformat the type string into an array of strings
    const added = await addPokemon(formatted); // add pokemon to db
    setPokemonList((prev) => [...prev, added]); // add pokemon to pokemonList (using the functional notation avoids messy async problems)
    setNewPokemon({ name: "", type: "", description: "" }); // reset new pokemon data
    setShowForm(false); // Hide form
  }

  return (
    <main className={styles.main}>
      <h1>Pokedex</h1>
      <p>Welcome!  This app will show and manage Pokemon from your database.</p>
      <button type="button" onClick={() => setShowForm(!showForm)}>New Entry</button>
      {showForm && (
        <NewPokemonForm
          onSubmit={handleSubmit}
          newPokemon={newPokemon}
          setNewPokemon={setNewPokemon}
        />
      )}
      <PokemonTable pokemonList={pokemonList} />
    </main>
  );
}
