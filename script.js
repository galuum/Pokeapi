function getPokemon() {
    let search = document.getElementById('search');
    let pokemon = search.value.toLowerCase();

    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let name = data.name;
            let type = "Tipo: " + data.types[0].type.name;

            // Extraer estadísticas específicas
            let stats = data.stats;
            let velocidad = stats.find(stat => stat.stat.name === 'speed').base_stat;
            let ataque = stats.find(stat => stat.stat.name === 'attack').base_stat;
            let ataqueEsp = stats.find(stat => stat.stat.name === 'special-attack').base_stat;
            let defensa = stats.find(stat => stat.stat.name === 'defense').base_stat;
            let defensaEsp = stats.find(stat => stat.stat.name === 'special-defense').base_stat;

            // Altura y peso
            let altura = data.height / 10 + " m";
            let peso = data.weight / 10 + " kg";
            let sprite = data.sprites.front_default;

            // Mostrar datos
            document.getElementById('name').textContent = name;
            document.getElementById('type').textContent = type;


            document.getElementById('stats').innerHTML = `
                Velocidad: ${velocidad} <br>
                Ataque: ${ataque} <br>
                Ataque Especial: ${ataqueEsp} <br>
                Defensa: ${defensa} <br>
                Defensa Especial: ${defensaEsp}
            `;
            document.getElementById('height').textContent = "Altura: " + altura;
            document.getElementById('weight').textContent = "Peso: " + peso;
            document.getElementById('sprite').src = sprite;

            // Obtener región desde species
            fetch(data.species.url)
                .then(res => res.json())
                .then(speciesData => {
                    fetch(speciesData.generation.url)
                        .then(res => res.json())
                        .then(generationData => {
                            let region = generationData.main_region.name;
                            document.getElementById('region').textContent = "Región: " + region;
                        });
                });

        })
        .catch(() => {
            alert('Pokémon no encontrado');
        });
}
