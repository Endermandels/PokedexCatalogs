// Creates a new pokemon form
export default function NewPokemonForm({ onSubmit, newPokemon, setNewPokemon }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={newPokemon.name}
                onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value})} // ...newPokemon takes the existing values of newPokemon and only changes name
                required
            />
            <input
                type="text"
                placeholder="Types(s), comma-separated"
                value={newPokemon.type}
                onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value})} // ...newPokemon takes the existing values of newPokemon and only changes type
                required
            />
            <input
                placeholder="Description"
                value={newPokemon.description}
                onChange={(e) => setNewPokemon({ ...newPokemon, description: e.target.value})} // ...newPokemon takes the existing values of newPokemon and only changes description
                required
            />
            <button type="submit">Add</button>
        </form>
    );
}