// Creates a pokemon form
export default function PokemonForm({ curPokemon, setCurPokemon, onSubmit, onCancel }) {
    function handleChange(e) {
        const { name, value } = e.target;
        setCurPokemon({ ...curPokemon, [name]: value }); // ...prev basically copies prev into the current object
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name='name'
                placeholder="Name"
                value={curPokemon.name ?? ""}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name='type'
                placeholder="Types(s), comma-separated"
                value={curPokemon.type ?? ""}
                onChange={handleChange} 
                required
            />
            <input
                name="description"
                placeholder="Description"
                value={curPokemon.description ?? ""} 
                onChange={handleChange}
            />
            <button type="submit">Save</button>
            {onCancel && <button type='button' onClick={onCancel}>Cancel</button>}
        </form>
    );
}