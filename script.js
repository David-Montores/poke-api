const getPokemones = async() => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()
    const pokemones = data.results
    return pokemones
}

const addImgs = async(pokemones) => {
    const promesas = pokemones.map(async(pokemon) => {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        pokemon.sprites = data.sprites
    })

    await Promise.all(promesas)
}

const printHtml = (pokemones) => {
    const pokemonList = document.getElementById('pokemon-list')

    pokemones.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const pokemonImg = pokemon.sprites.front_default

      const container = document.createElement('div')
      container.className = 'pokemon-container'

      const img = document.createElement('img')
      img.src = pokemonImg;

      const h6 = document.createElement('h6')
      h6.textContent = pokemonName

      container.appendChild(img)
      container.appendChild(h6)

      pokemonList.appendChild(container)
    });
}

const setPokeList = async() => {
    const pokemones = await getPokemones()
    await addImgs(pokemones)
    
    printHtml(pokemones)
}

setPokeList()