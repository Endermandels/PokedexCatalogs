"use client"; // enables React hooks and interactivity in the component

import { useState, useEffect } from "react";
import styles from "@/styles/page.module.css";
import { fetchPokemon, addPokemon, updatePokemon, deletePokemon } from "@/lib/api";
import PokemonForm from "@/components/PokemonForm";
import PokemonTable from "@/components/PokemonTable";


export default function Home() {
  // useState triggers a re-render, whereas changing a variable does not 
  const [pokemonList, setPokemonList] = useState([]); // setting the pokemon list
  const [curPokemonId, setCurPokemonId] = useState(-1);
  const [curPokemon, setCurPokemon] = useState({ name: "", type: "", description: "" }); // setting the new pokemon
  const [showForm, setShowForm] = useState(false); // basically a toggle

  const fetchSortedPokemon = () => {
    fetchPokemon().then(data => {
      const sorted = [...data].sort((a, b) => a.id - b.id);
      setPokemonList(sorted);
    }); // Updates the pokemonList upon fetching the pokemon data
  }

  // Called upon rendering the Home page
  useEffect(() => {
    fetchSortedPokemon();
  }, []);

  const resetData = () => {
    setCurPokemon({ name: "", type: "", description: "" });
    setCurPokemonId(-1);
    setShowForm(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = { ...curPokemon, type: curPokemon.type.split(",").map(t => t.trim()) }; // reformat the type string into an array of strings
    const added = curPokemonId > -1 ? await updatePokemon(formatted, curPokemonId) : await addPokemon(formatted); // add pokemon to db
    fetchSortedPokemon();
    resetData();
  }

  const handleRowClick = (poke) => {
    setCurPokemon({...poke, type: poke.type.join(", ")});
    setCurPokemonId(poke.id);
    setShowForm(true);
    scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleClose = () => {
    resetData();
  }

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${curPokemon.name}?`)) {
      await deletePokemon(curPokemonId);
      fetchSortedPokemon();
      resetData();
    }
  }

  const handleNewEntry = () => {
    setCurPokemon({ name: "", type: "", description: "" });
    setCurPokemonId(-1);
    setShowForm(true);
  }

  return (
    <main className={styles.main}>
      <h1>Pokedex</h1>
      <p>Welcome!  This app will show and manage Pokemon from your database.</p>
      <button type="button" onClick={handleNewEntry}>New Entry</button>
      {showForm && (
        <PokemonForm
          curPokemon={curPokemon}
          setCurPokemon={setCurPokemon}
          onSubmit={handleSubmit}
          onDelete={curPokemonId > -1 ? handleDelete : undefined}
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
