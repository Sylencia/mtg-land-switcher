import languageData from './data/languages.json'

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

export const getRandomisedLands = (landData, land, oldLands = {}) => {
  const landTypes = Object.keys(landData)
  const randomisedLands = landTypes.reduce((newLands, landType) => {
    const possibleLands = landData[landType].filter(land => land.selectable)
    if (land === 'all' || land === landType) {
      newLands[landType] = possibleLands[getRandomInt(possibleLands.length)]
    } else {
      newLands[landType] = oldLands[landType]
    }
    return newLands
  }, {})

  return randomisedLands
}

export const changeLandsInDeck = (deck, lands, userLang = 'en') => {
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
        const cardName = `${name} ${lands[landType].name}`
        return `${count} ${cardName}`
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
