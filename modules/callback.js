// async

function getCallbackAsyncRickAndMortyData(url, callback) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('Episodes callback async:', data)
      callback(data)
    })
    .catch((error) => console.error(error))
}

// sync

function getCallbackSyncRickAndMortyData(url, callback) {
  const syncCallbackRequest = new XMLHttpRequest()
  syncCallbackRequest.open('GET', `${url}`, false)
  try {
    syncCallbackRequest.send()
    if (syncCallbackRequest.status != 200) {
      console.log(
        `Error ${syncCallbackRequest.status}: ${syncCallbackRequest.statusText}`,
      )
    } else {
      const data = JSON.parse(syncCallbackRequest.response)
      console.log('Episodes callback sync:', data)
      callback(data)
    }
  } catch (err) {
    console.error(err)
  }
}

export { getCallbackAsyncRickAndMortyData, getCallbackSyncRickAndMortyData }
