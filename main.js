// Array Processing Tool

const subSumArrayFirst = document.querySelector('#subsum-first')
const subSumArraySecond = document.querySelector('#subsum-second')
let subSumResult = document.querySelector('#subsum-result')

const searchedArray = document.querySelector('#search')
let searchedResult = document.querySelector('#search-result')

const selectedArray = document.querySelector('#selection')
let selectedResult = document.querySelector('#selection-result')

const subSumObj = {
  maxSum: 0,
  numObj: {
    min: 0,
    max: 0,
    median: 0,
  },
  increazingSequence: [],
  // O(n2)

  getMaxSubSumFirst: function (str) {
    const strArray = str.split(',')

    for (let i = 0; i < strArray.length; i++) {
      let sumFixedStart = 0
      for (let j = i; j < strArray.length; j++) {
        sumFixedStart += Number(strArray[j])
        this.maxSum = Math.max(this.maxSum, sumFixedStart)
      }
    }
    subSumResult.value = this.maxSum
    return this.maxSum
  },

  // O(n)

  getMaxSubSumSecond: function (str) {
    const numArray = str.split(',').map((item) => +item)

    let partialSum = 0

    for (let item of numArray) {
      partialSum += item
      this.maxSum = Math.max(this.maxSum, partialSum)
      if (partialSum < 0) partialSum = 0
    }
    subSumResult.value = this.maxSum
    return this.maxSum
  },

  getMaxMinMedOfArray: function (str) {
    const numArray = str.split(',').map((item) => +item)

    const maxNum = Math.max(...numArray)
    const minNum = Math.min(...numArray)

    function median(numArray) {
      numArray.sort((a, b) => a - b)

      if (numArray.length % 2) {
        return numArray[Math.floor(numArray.length / 2)]
      } else {
        return (
          (numArray[numArray.length / 2] + numArray[numArray.length / 2 - 1]) /
          2
        )
      }
    }

    const medNum = median(numArray)

    this.numObj.min = minNum
    this.numObj.max = maxNum
    this.numObj.median = medNum

    const result = Object.entries(this.numObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')

    searchedResult.value = result
    return result
  },
  getMaxIncreasingSequence: function (str) {
    const numArray = str.split(',').map((item) => +item)

    const commonArr = []
    let newMaxArr = []

    for (let i = 0; i < numArray.length; i++) {
      const nextItem = numArray[i + 1]

      newMaxArr.push(numArray[i])

      if (nextItem && nextItem < numArray[i]) {
        commonArr.push(newMaxArr)
        newMaxArr = []
      }
    }
    this.increazingSequence = commonArr.sort((a, b) => b.length - a.length)[0]
    selectedResult.value = this.increazingSequence.join(', ')
    return this.increazingSequence
  },
}

subSumArrayFirst.addEventListener('change', (event) =>
  subSumObj.getMaxSubSumFirst(event.target.value),
)

subSumArraySecond.addEventListener('change', (event) =>
  subSumObj.getMaxSubSumSecond(event.target.value),
)

searchedArray.addEventListener('change', (event) =>
  subSumObj.getMaxMinMedOfArray(event.target.value),
)

selectedArray.addEventListener('change', (event) =>
  subSumObj.getMaxIncreasingSequence(event.target.value),
)

// Date Display Formatter

const dateToFormat = document.querySelector('#date')
const formatedDateHyphen = document.querySelector('#date-hyphen')
const formatedDateMonth = document.querySelector('#date-month')
const formatedDateRevert = document.querySelector('#date-revert')
const formatedDateHyphenRevert = document.querySelector('#date-hyphen-revert')
const formatedDateFromNow = document.querySelector('#date-from-now')

const dateObj = {
  day: '',
  month: '',
  year: '',
  dateArray: [],

  formatDate: function (str) {
    let dateWithHyphen
    let dateWithMonth
    let revertedDate
    let dateWithHyphenRevert
    let dateFromNow

    const reg = /^(1[0-9]|0[1-9])(0[1-9]|1[0-2])([1-2]\d{2}[0-9])$/g
    const regHyphen = /MM-DD-YYYY/
    const regFrom = /YYYY-MM-DD/
    const regRevert = /YYYYMMDD$/

    if (regHyphen.test(str)) {
      this.day = str.slice(6, 8)
      this.month = str.slice(4, 6)
      this.year = str.slice(0, 4)

      this.dateArray.push(this.day, this.month, this.year)

      dateWithHyphenRevert = this.dateArray.join('-')
      formatedDateHyphenRevert.textContent = dateWithHyphenRevert
      setTimeout(() => {
        formatedDateHyphenRevert.textContent = ''
      }, 3000)
    } else if (regRevert.test(str)) {
      this.day = str.slice(6, 8)
      this.month = str.slice(4, 6)
      this.year = str.slice(0, 4)

      this.dateArray.push(this.day, this.month, this.year)

      const date = new Date(this.year, +this.month - 1, this.day)
      revertedDate = date.toLocaleString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      formatedDateRevert.textContent = revertedDate
      setTimeout(() => {
        formatedDateRevert.textContent = ''
      }, 3000)
    } else if (regFrom.test(str)) {
      const arr = str.split(/[-,]+/)

      this.day = arr[2]
      this.month = arr[1]
      this.year = arr[0]

      const dateFromInput = new Date(this.year, +this.month - 1, this.day)
      const currentDate = new Date()

      dateFromNow = Math.round((currentDate - dateFromInput) / 31536000000)
      formatedDateFromNow.textContent = `${dateFromNow} years ago`
      setTimeout(() => {
        formatedDateFromNow.textContent = ''
      }, 3000)
    } else if (reg.test(str)) {
      this.day = str.slice(0, 2)
      this.month = str.slice(2, 4)
      this.year = str.slice(4)

      this.dateArray.push(this.day, this.month, this.year)

      dateWithHyphen = this.dateArray.join('-')

      const date = new Date(this.year, +this.month - 1, this.day)
      dateWithMonth = date.toLocaleString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      formatedDateMonth.textContent = dateWithMonth
      formatedDateHyphen.textContent = dateWithHyphen
      setTimeout(() => {
        formatedDateMonth.textContent = ''
        formatedDateHyphen.textContent = ''
      }, 3000)
    }
  },
}
dateToFormat.addEventListener('change', (event) => {
  dateObj.formatDate(event.target.value)
})

// Text Formatter

const textToFormat = document.querySelector('#text')
let formatedText = document.querySelector('#text-result')

const textObj = {
  textResult: '',
  formatStr: function (str) {
    const length = str.length
    const symb = '...'
    if (length >= 100) {
      this.textResult = str.substr(0, 70).replace(/\s/g, '\n') + symb
    }
    formatedText.value = this.textResult

    return this.textResult
  },
}

textToFormat.addEventListener('change', (event) => {
  textObj.formatStr(event.target.value)
})

// String calculator

const output = document.querySelector('#calc-result')
const div = document.createElement('div')
div.classList.add('keyboard')
document.querySelector('.form__field_calc').appendChild(div)

const btnStr = 'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='
btnStr.split(' ').map((symbol) => {
  div.insertAdjacentHTML(
    'beforeend',
    `<button value="${symbol}">${symbol}</button>`,
  )
})

const objCalc = {
  calcFunc: function (value) {
    if (value === '=' || value === 'Enter') {
      try {
        output.textContent = eval(output.textContent)
      } catch {
        let oldValue = output.textContent
        let newValue = 'Please, try again'
        output.textContent = newValue
        setTimeout(() => {
          output.textContent = oldValue
        }, 1500)
      }
    } else if (value === 'C') {
      output.textContent = ''
    } else if (value === 'CE' || value === 'Backspace') {
      output.textContent = output.textContent.substring(
        0,
        output.textContent.length - 1,
      )
    } else {
      output.textContent += value
    }
  },
}

document.querySelector('.keyboard').addEventListener('click', (event) => {
  event.preventDefault()
  objCalc.calcFunc(event.target.value)
})

// Array Sorter

const arrayToSortOne = document.querySelector('#sorter-one')
const arrayToSortTwo = document.querySelector('#sorter-two')
const arrayToSortThree = document.querySelector('#sorter-three')
const arrayToSortFour = document.querySelector('#sorter-four')
let sortedArray = document.querySelector('#sorter-result')

const sortObj = {
  sortResult: '',
  numArray: [],

  strToArray: function (str) {
    this.numArray = str.split(',').map((item) => +item)
  },

  sortFuncOne: function () {
    this.sortResult = this.numArray.sort((a, b) => a - b).join(', ')
    sortedArray.value = this.sortResult

    return this.sortResult
  },
  sortFuncTwo: function () {
    const arr = this.numArray
    let stepsCount = arr.length - 1
    let swapped
    do {
      swapped = false
      for (let i = 0; i < stepsCount; i += 1) {
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i]
          arr[i] = arr[i + 1]
          arr[i + 1] = temp
          swapped = true
        }
      }
      stepsCount -= 1
    } while (swapped)

    this.sortResult = arr.join(', ')
    sortedArray.value = this.sortResult

    return this.sortResult
  },
  sortFuncThree: function () {
    const sortFunc = (a, b) => {
      return a > b ? 1 : b > a ? -1 : 0
    }
    this.sortResult = this.numArray.sort(sortFunc).join(', ')
    sortedArray.value = this.sortResult
    return this.sortResult
  },
  sortFuncFour: function () {
    let arrCopy = this.numArray.slice(0, this.numArray.length)
    let result = []

    arrCopy.forEach(() => {
      let minElementIndex = 0
      minElementIndex = this.numArray.indexOf(
        Math.min.apply(Math, this.numArray),
      )

      result.push(this.numArray[minElementIndex])
      this.numArray.splice(minElementIndex, 1)
    })
    this.sortResult = result.join(', ')
    sortedArray.value = this.sortResult
    return this.sortResult
  },
}

arrayToSortOne.addEventListener('change', (event) => {
  sortObj.strToArray(event.target.value)
  sortObj.sortFuncOne()
})
arrayToSortTwo.addEventListener('change', (event) => {
  sortObj.strToArray(event.target.value)
  sortObj.sortFuncTwo()
})
arrayToSortThree.addEventListener('change', (event) => {
  sortObj.strToArray(event.target.value)
  sortObj.sortFuncThree()
})
arrayToSortFour.addEventListener('change', (event) => {
  sortObj.strToArray(event.target.value)
  sortObj.sortFuncFour()
})

// Binary Converter

const numberToConvert = document.querySelector('#converter')
let convertedNumber = document.querySelector('#converter-result')

convertObj = {
  convertedResult: '',
  convertFunc: function (str) {
    const arr = str.split(',')
    const binaryRegexp = /(\-|\+)?\b[01]+\b/

    const value = arr.every((item) => binaryRegexp.test(item))

    let digit
    const newArray = []

    if (value) {
      arr.forEach((item) => {
        digit = parseInt(item, 2)
        newArray.push(digit)
      })
    } else {
      arr.forEach((item) => {
        digit = +parseInt(item).toString(2)
        newArray.push(digit)
      })
    }

    this.convertedResult = newArray.join(', ')

    convertedNumber.value = this.convertedResult
    return this.convertedResult
  },
}

numberToConvert.addEventListener('change', (event) => {
  convertObj.convertFunc(event.target.value)
})

// //  Caching calculator

// const numberForCacheCalc = document.querySelector('#cache-calc')
// let cacheCalcResult = document.querySelector('#cache-calc-result')

// const cacheCalcObj = {
//   cacheCalcFunc: function () {
//     let cache = {}
//     return (n) => {
//       if (n in cache) {
//         cacheCalcResult.value = `Fetching from cache: ${cache[n]}`
//         return cache[n]
//       } else {
//         let result = n * 10
//         cache[n] = result
//         cacheCalcResult.value = `Calculating result : ${result}`
//         return result
//       }
//     }
//   },
// }

// const newAdd = cacheCalcObj.cacheCalcFunc()

// numberForCacheCalc.addEventListener('change', (event) => {
//   newAdd(event.target.value)
// })
