"use client"; // enables React hooks and interactivity in the component

import { useState, useEffect } from "react";
import styles from "@/styles/page.module.css";
import { fetchPokemon, addPokemon, updatePokemon } from "@/lib/api";
import PokemonForm from "@/components/PokemonForm";
import PokemonTable from "@/components/PokemonTable";


export default function Home() {
  // useState triggers a re-render, whereas changing a variable does not 
  const [pokemonList, setPokemonList] = useState([]); // setting the pokemon list
  const [curPokemonId, setCurPokemonId] = useState(-1);
  const [curPokemon, setCurPokemon] = useState({ name: "", type: "", description: "" }); // setting the new pokemon
  const [showForm, setShowForm] = useState(false); // basically a toggle

  // Called upon rendering the Home page
  useEffect(() => {
    fetchPokemon().then(data => {
      const sorted = [...data].sort((a, b) => a.id - b.id);
      setPokemonList(sorted);
    }); // Updates the pokemonList upon fetching the pokemon data
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = { ...curPokemon, type: curPokemon.type.split(",").map(t => t.trim()) }; // reformat the type string into an array of strings
    const added = curPokemonId > -1 ? await updatePokemon(formatted, curPokemonId) : await addPokemon(formatted); // add pokemon to db
    fetchPokemon().then(data => {
      const sorted = [...data].sort((a, b) => a.id - b.id);
      setPokemonList(sorted);
    });
    setCurPokemon({ name: "", type: "", description: "" }); // reset cur pokemon data
    setCurPokemonId(-1);
    setShowForm(false); // Hide form
  }

  const handleRowClick = (poke) => {
    setCurPokemon({...poke, type: poke.type.join(", ")});
    setCurPokemonId(poke.id);
    setShowForm(true);
  }

  const handleClose = () => {
    setCurPokemon({ name: "", type: "", description: "" });
    setCurPokemonId(-1);
    setShowForm(false);
  }

  return (
    <main className={styles.main}>
      <h1>Pokedex</h1>
      <p>Welcome!  This app will show and manage Pokemon from your database.</p>
      <button type="button" onClick={() => setShowForm(!showForm)}>New Entry</button>
      {showForm && (
        <PokemonForm
          curPokemon={curPokemon}
          setCurPokemon={setCurPokemon}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
      <PokemonTable 
        pokemonList={pokemonList}
        onRowClick={handleRowClick}
      />
    </main>
  );
}
