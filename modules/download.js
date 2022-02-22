export const downloadData = (data, str) => {
  const blob = new Blob([JSON.stringify(data.results)], {
    type: 'text/javascript',
  })
  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(blob))
  link.setAttribute('download', `${str}.js`)
  link.click()
}
