import * as urls from './modules/urls.js'
import {
  getRickAndMortyData,
  getAsyncRickAndMortyData,
} from './modules/async.js'
import {
  getCallbackAsyncRickAndMortyData,
  getCallbackSyncRickAndMortyData,
} from './modules/callback.js'
import { downloadData } from './modules/download.js'
import * as syncFunc from './modules/sync.js'

// async

getRickAndMortyData()
getAsyncRickAndMortyData()

//sync

const syncRequest = new XMLHttpRequest()
syncRequest.onload = syncFunc.getData
syncRequest.onerror = syncFunc.catchError
syncRequest.open('GET', `${urls.urlEpisode}`, false)
syncRequest.send()

// callback

getCallbackAsyncRickAndMortyData(urls.urlEpisode, (data) => {
  downloadData(data, 'async-callback-episodes')
})

getCallbackSyncRickAndMortyData(urls.urlEpisode, (data) => {
  downloadData(data, 'sync-callback-episodes')
})
