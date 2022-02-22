import * as urls from './urls.js'
import { downloadData } from './download.js'

// promise

const getRickAndMortyData = () => {
  const characterData = fetch(urls.urlCharacter)
    .then((response) => response.json())
    .then((data) => {
      downloadData(data, 'characters')
      console.log('Characters:', data)
    })
    .catch((error) => console.error(error))
  return characterData
}

// async/await

async function getAsyncRickAndMortyData() {
  try {
    const response = await fetch(urls.urlLocation)
    const locationData = await response.json()
    downloadData(locationData, 'location')
    console.log('Locations:', locationData)
    return locationData
  } catch (error) {
    console.error(error)
  }
}

export { getRickAndMortyData, getAsyncRickAndMortyData }
