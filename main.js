document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('pokemonQuiz').addEventListener('submit', async function(event) {
        event.preventDefault();

        const tally = {};

        const selects = document.querySelectorAll('#pokemonQuiz select');

        selects.forEach(select => {
            const type = select.value.toLowerCase();
            if (type) {
                tally[type] = (tally[type] || 0) + 1;
            }
        });

        let maxType = null;
        let maxCount = 0;
        for (const type in tally) {
            if (tally[type] > maxCount) {
                maxCount = tally[type];
                maxType = type;
            }
        }
        if (maxType === null || maxType === "") {
            maxType = "normal";
        }

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${maxType}`);
            let pokemonOfType = response.data.pokemon.map(p => p.pokemon);

            pokemonOfType = pokemonOfType.filter(pokemon => {
                const pokemonId = parseInt(pokemon.url.split('/').filter(Boolean).pop());
                return pokemonId <= 150;
            });

            if (pokemonOfType.length === 0) {
                alert(`No Pokémon of type ${maxType} found among the original 150.`);
                return;
            }

            const randomIndex = Math.floor(Math.random() * pokemonOfType.length);
            const randomPokemonUrl = pokemonOfType[randomIndex].url;

            const pokemonDetailsResponse = await axios.get(randomPokemonUrl);
            const pokemonDetails = pokemonDetailsResponse.data;

            const yourPokemonImg = document.getElementById('yourPokemon');
            const pokemonName = document.getElementById('pokemonName');
            const pokemonType = document.getElementById('pokemonType');
            const pokemonAbility = document.getElementById('pokemonAbility');

            yourPokemonImg.src = pokemonDetails.sprites.front_default;
            yourPokemonImg.alt = pokemonDetails.name;
            pokemonName.textContent = `Name: ${capitalizeFirstLetter(pokemonDetails.name)}`;
            pokemonType.textContent = `Type: ${pokemonDetails.types.map(t => capitalizeFirstLetter(t.type.name)).join(', ')}`;
            pokemonAbility.textContent = `Abilities: ${pokemonDetails.abilities.map(a => capitalizeFirstLetter(a.ability.name)).join(', ')}`;

            const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonModal'));
            pokemonModal.show();
        } catch (error) {
            console.error('There was an error fetching the Pokémon data:', error);
            alert('Failed to fetch Pokémon data.');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getRandomPokemon').addEventListener('click', async () => {
        const randomId = Math.floor(Math.random() * 151) + 1;

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const pokemonImage = response.data.sprites.front_default;
            const pokemonName = capitalizeFirstLetter(response.data.name);
            const pokemonHeight = response.data.height / 10;
            const pokemonWeight = response.data.weight / 10;
            const pokemonAbilities = response.data.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(', ');
            const pokemonMoves = response.data.moves.slice(0, 12).map(move => capitalizeFirstLetter(move.move.name)).join(', ');

            document.getElementById('randomPokemon').innerHTML = `<img src="${pokemonImage}" alt="Random Pokemon: ${pokemonName}" class="pokemon-image img-fluid">`;
            document.getElementById('pokemonInfo').innerHTML = `
                <h2>${pokemonName}</h2>
                <p>Height: <span id="pokemonHeight">${pokemonHeight} m</span></p>
                <p>Weight: <span id="pokemonWeight">${pokemonWeight} kg</span></p>
                <p>Abilities: <span id="pokemonAbilities">${pokemonAbilities}</span></p>
                <p>Moves: <span id="pokemonMoves">${pokemonMoves}</span></p>
            `;
        } catch (error) {
            console.error('Error fetching random Pokémon:', error);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getStartingSix').addEventListener('click', async () => {
        const pokemonImages = document.querySelectorAll('#startingSix .pokemon-image');

        pokemonImages.forEach(img => {
            img.src = './images/Poke_Ball.webp';
        });

        const promises = [];
        for (let i = 0; i < 6; i++) {
            const randomId = Math.floor(Math.random() * 151) + 1;
            const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
            promises.push(axios.get(url));
        }

        try {
            const results = await Promise.all(promises);
            results.forEach((result, index) => {
                const pokemonImage = result.data.sprites.front_default;
                const pokemonName = result.data.name;
                pokemonImages[index].src = pokemonImage;
                pokemonImages[index].alt = `Pokemon ${index + 1}: ${pokemonName}`;
            });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    });
});

document.getElementById('resetStartingSix').addEventListener('click', function() {
    const pokemonImages = document.querySelectorAll('#startingSix .pokemon-image');
    pokemonImages.forEach(img => {
        img.src = './images/wtp.png';
    });
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getStartingSix').addEventListener('click', async () => {
        const pokemonImages = document.querySelectorAll('#startingSix .pokemon-image');

        pokemonImages.forEach(img => {
            img.src = './images/Poke_Ball.webp';
        });

        const promises = [];
        for (let i = 0; i < 6; i++) {
            const randomId = Math.floor(Math.random() * 151) + 1;
            const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
            promises.push(axios.get(url));
        }

        try {
            const results = await Promise.all(promises);
            results.forEach((result, index) => {
                const pokemonImage = result.data.sprites.front_default;
                const pokemonName = result.data.name;
                pokemonImages[index].src = pokemonImage;
                pokemonImages[index].alt = `Pokemon ${index + 1}: ${pokemonName}`;
            });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    });
});

document.getElementById('resetStartingSix').addEventListener('click', function() {
    const pokemonImages = document.querySelectorAll('#startingSix .pokemon-image');
    pokemonImages.forEach(img => {
        img.src = './images/wtp.png';
    });
});
