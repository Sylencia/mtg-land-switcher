import languageData from './data/languages.json'

const shuffleArray = deck => {
  let oldPos = deck.length
  while (oldPos) {
    const newPos = Math.floor(Math.random() * oldPos--)
    const temp = deck[oldPos]
    deck[oldPos] = deck[newPos]
    deck[newPos] = temp
  }
  return deck
}

export const getRandomisedLands = (landData, land, oldLands = {}) => {
  const landTypes = Object.keys(landData)
  const randomisedLands = landTypes.reduce((newLands, landType) => {
    const possibleLands = landData[landType].filter(land => land.selectable)
    if (land === 'all' || land === landType) {
      newLands[landType] = shuffleArray(possibleLands)
    } else {
      newLands[landType] = oldLands[landType]
    }
    return newLands
  }, {})

  return randomisedLands
}

export const transformToSingleLand = (deck, lands, userLang = 'en') => {
  const deckArray = deck.split('\n')
  const newDeckArray = deckArray.map(card => {
    const splitCard = card.split(' ')
    if (splitCard.length === 4) {
      const [count, name] = splitCard
      // First check if their card is in their language
      const foundName = Object.values(languageData[userLang]).find(
        val => val === name
      )
      if (foundName !== undefined) {
        const landType = getLandTypeFromLanguage(name, userLang)
        // new land is the first of the shuffled list
        const newLand = lands[landType][0]
        const cardName = `${name} ${newLand.name}`
        return `${count} ${cardName}`
      }
    }

    return card
  })

  return newDeckArray.join('\n')
}

export const transformToMultipleLands = (deck, lands, userLang = 'en') => {
  console.log(lands)
  const deckArray = deck.split('\n')
  const newDeckArray = deckArray.map(card => {
    const splitCard = card.split(' ')
    if (splitCard.length === 4) {
      const [count, name] = splitCard
      // First check if their card is in their language
      const foundName = Object.values(languageData[userLang]).find(
        val => val === name
      )
      if (foundName !== undefined) {
        const landType = getLandTypeFromLanguage(name, userLang)
        const newLands = lands[landType]
        let remainingLands = count
        let newLandCount = newLands.length
        let rLandIndex = 0
        const cardArray = []
        while (remainingLands > 0) {
          const newLand = newLands[rLandIndex]
          const cardName = `${name} ${newLand.name}`
          const landCount = Math.ceil(remainingLands / newLandCount)
          remainingLands -= landCount
          newLandCount--
          rLandIndex++
          cardArray.push(`${landCount} ${cardName}`)
        }

        return cardArray.join('\n')
      }
    }

    return card
  })

  return newDeckArray.join('\n')
}

export const translateLandName = (name, language = 'en') =>
  languageData[language][name]

export const getLandTypeFromLanguage = (name, language = 'en') => {
  const data = Object.entries(languageData[language])
  const [enName] = data.find(([, translated]) => translated === name)
  return enName
}
