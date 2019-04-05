import languageData from '../data/languages.json'

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

export const transformLandsInDeck = (
  deck,
  lands,
  userLang = 'en',
  numberOfLands
) => {
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
        let remainingLandCount = count
        let remainingArtCount =
          numberOfLands > 0
            ? Math.min(newLands.length, numberOfLands)
            : newLands.length
        let landIndex = 0
        const cardArray = []
        while (remainingLandCount > 0) {
          const newLand = newLands[landIndex++]
          const cardName = `${name} ${newLand.name}`
          const landCount = Math.ceil(remainingLandCount / remainingArtCount)
          remainingLandCount -= landCount
          remainingArtCount--
          cardArray.push(`${landCount} ${cardName}`)
        }

        return cardArray
          .sort()
          .reverse()
          .join('\n')
      }
    }

    return card
  })

  return newDeckArray.join('\n')
}

export const translateLandName = (name, language = 'en') => {
  return languageData[language][name]
}

export const getLandTypeFromLanguage = (name, language = 'en') => {
  const data = Object.entries(languageData[language])
  const [enName] = data.find(([, translated]) => translated === name)
  return enName
}
