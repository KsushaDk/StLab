const urlCharacter = 'https://rickandmortyapi.com/api/character'
const urlLocation = 'https://rickandmortyapi.com/api/location'
const urlEpisode = 'https://rickandmortyapi.com/api/episode'

const downloadData = (data, str) => {
  const blob = new Blob([JSON.stringify(data.results)], {
    type: 'text/javascript',
  })
  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(blob))
  link.setAttribute('download', `${str}.js`)
  link.click()
}

// async

const getRickAndMortyData = () => {
  const characterData = fetch(urlCharacter)
    .then((response) => response.json())
    .then((data) => {
      downloadData(data, 'characters')
      console.log('Characters:', data)
    })
    .catch((error) => console.error(error))
  return characterData
}

getRickAndMortyData()

async function getAsyncRickAndMortyData() {
  try {
    const response = await fetch(urlLocation)
    const locationData = await response.json()
    downloadData(locationData, 'location')
    console.log('Locations:', locationData)
    return locationData
  } catch (error) {
    console.error(error)
  }
}

getAsyncRickAndMortyData()

// callback

function getSyncRickAndMortyData(url, callback) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error(error))
}

getSyncRickAndMortyData(urlEpisode, (data) => {
  downloadData(data, 'episodes')
  console.log('Episodes async:', data)
})

// sync

function getData() {
  const episodeData = JSON.parse(this.responseText)
  downloadData(episodeData, 'sync-episodes')
  console.log('Episodes sync:', episodeData)
}
function catchError(error) {
  console.error(error)
}

const syncRequest = new XMLHttpRequest()
syncRequest.onload = getData
syncRequest.onerror = catchError

syncRequest.open('GET', `${urlEpisode}`, false)
syncRequest.send()
