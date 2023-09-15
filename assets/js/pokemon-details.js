const pokemonImage = document.getElementById('pokemonImage');
const pokemonInfo = document.getElementById('pokemonInfo');
const pokemonDetails = document.getElementById('pokemonDetails');

// Função para exibir os detalhes do Pokémon
function showPokemonDetails(pokemon) {
    if (pokemon) {
        pokemonImage.style.transform = 'scale(1.5)'; // Aumenta o tamanho da imagem
        pokemonDetails.style.display = 'block'; // Exibe os detalhes do Pokémon
        // Preencha o elemento "pokemonInfo" com os detalhes do Pokémon
        pokemonInfo.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>Number: #${pokemon.number}</p>
            <p>Type: ${pokemon.type}</p>
            <!-- Outros detalhes do Pokémon aqui -->
        `;
    }
}

// Adicione um ouvinte de evento de clique à imagem do Pokémon
pokemonImage.addEventListener('click', () => {
    showPokemonDetails(selectedPokemon);
});
