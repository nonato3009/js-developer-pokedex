// Suponha que você tenha uma lista de Pokémon chamada "pokemonList" e uma variável "selectedPokemon" com os detalhes do Pokémon selecionado

const pokemonList = document.getElementById('pokemonList');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonInfo = document.getElementById('pokemonInfo');
const pokemonDetails = document.getElementById('pokemonDetails');
const loadMoreButton = document.getElementById('loadMoreButton');

let offset = 0;
const limit = 10;
const maxRecords = 151;

// Função para preencher a lista de Pokémon
function populatePokemonList(pokemons) {
    const listItems = pokemons.map((pokemon) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${pokemon.number} - ${pokemon.name}`;
        listItem.classList.add('pokemon');
        listItem.classList.add(pokemon.type);

        listItem.addEventListener('click', () => {
            selectPokemon(pokemon);
        });

        return listItem;
    });

    listItems.forEach((listItem) => {
        pokemonList.appendChild(listItem);
    });
}

// Função para selecionar um Pokémon
function selectPokemon(pokemon) {
    selectedPokemon = pokemon;
    updatePokemonDetails();
}

// Função para atualizar a visualização de detalhes do Pokémon
function updatePokemonDetails() {
    if (selectedPokemon) {
        pokemonImage.src = selectedPokemon.photo;
        pokemonImage.style.transform = 'scale(1.5)';
        pokemonDetails.style.display = 'block';

        pokemonInfo.innerHTML = `
            <h2>${selectedPokemon.name}</h2>
            <p>Number: #${selectedPokemon.number}</p>
            <p>Type: ${selectedPokemon.type}</p>
            <!-- Outros detalhes do Pokémon aqui -->
        `;
    }
}

// Função para carregar mais Pokémon
function loadMorePokemons() {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        pokeApi.getPokemons(offset, newLimit).then((pokemons) => {
            populatePokemonList(pokemons);
            loadMoreButton.parentElement.removeChild(loadMoreButton);
        });
    } else {
        pokeApi.getPokemons(offset, limit).then((pokemons) => {
            populatePokemonList(pokemons);
        });
    }
}

// Carrega os primeiros Pokémon
pokeApi.getPokemons(offset, limit).then((pokemons) => {
    populatePokemonList(pokemons).join('');
});

// Adiciona um ouvinte de evento ao botão "Load More"
loadMoreButton.addEventListener('click', loadMorePokemons);

let selectedPokemon = null; // Variável para armazenar o Pokémon selecionado

// Função para criar uma cópia da imagem e mostrar os detalhes do Pokémon
function showPokemonDetails() {
    if (selectedPokemon) {
        // Crie uma cópia da imagem original
        const enlargedImage = pokemonImage.cloneNode(true);
        enlargedImage.style.transform = 'scale(1.5)'; // Aumenta o tamanho da cópia

        // Limpe a área de detalhes e insira a cópia da imagem
        pokemonInfo.innerHTML = '';
        pokemonInfo.appendChild(enlargedImage);

        pokemonDetails.style.display = 'block'; // Exibe os detalhes do Pokémon
        // Preencha o elemento "pokemonInfo" com os detalhes do Pokémon
        pokemonInfo.innerHTML += `
            <h2>${selectedPokemon.name}</h2>
            <p>Number: #${selectedPokemon.number}</p>
            <p>Type: ${selectedPokemon.type}</p>
            <!-- Outros detalhes do Pokémon aqui -->
        `;
    }
}

// Adicione um ouvinte de evento de clique à imagem do Pokémon
pokemonImage.addEventListener('click', showPokemonDetails);