import { downloadData } from './download.js'

function getData() {
  const episodeData = JSON.parse(this.responseText)
  downloadData(episodeData, 'sync-episodes')
  console.log('Episodes sync:', episodeData)
}

function catchError(error) {
  console.error(error)
}

export { getData, catchError }
