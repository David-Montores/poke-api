const getPokeData = async(url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
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
    while (pokemonList.firstChild) {
      pokemonList.removeChild(pokemonList.firstChild)
    }

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

const setChangePage = (urls) => {
    const nextBtn = document.getElementById('next-btn')
    nextBtn.onclick = () => clickHandler(urls.next)
    
    const backBtn = document.getElementById('back-btn')
    backBtn.onclick = () => clickHandler(urls.previous)
}
const clickHandler = url => setPokeList(url)

const setPokeList = async(url) => {
    const pokeData = await getPokeData(url)
    const pokemones = pokeData.results

    setChangePage(pokeData)

    await addImgsCries(pokemones)
    
    printHtml(pokemones)
}

setPokeList('https://pokeapi.co/api/v2/pokemon?limit=28')