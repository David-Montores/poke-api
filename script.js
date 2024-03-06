const getPokemones = async() => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()
    const pokemones = data.results
    return pokemones
}

const addImgsCries = async(pokemones) => {
    const promesas = pokemones.map(async(pokemon) => {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        pokemon.sprites = data.sprites
        pokemon.cries = data.cries
    })

    await Promise.all(promesas)
}

const printHtml = (pokemones) => {
    const pokemonList = document.getElementById('pokemon-list')

    pokemones.forEach((pokemon) => {
        const pokemonName = pokemon.name
        const pokemonImg = pokemon.sprites.front_default

        const container = document.createElement('div')
        container.className = 'pokemon-card'
  
        const pokeImg = document.createElement('img')
        pokeImg.src = pokemonImg
  
        const aTitle = document.createElement('a')
        aTitle.className = 'pokemon-title'
        aTitle.textContent = pokemonName
  
        container.appendChild(pokeImg)
        container.appendChild(aTitle)
  
        pokemonList.appendChild(container)

        container.addEventListener('click', () => {
            const pokeCry = document.getElementById('pokemon-cries')
            pokeCry.src = pokemon.cries.latest
            pokeCry.play()
        })
    })
}

const setPokeList = async() => {
    const pokemones = await getPokemones()
    await addImgsCries(pokemones)
    
    printHtml(pokemones)
}

setPokeList()