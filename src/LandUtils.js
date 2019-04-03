const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

export const getRandomisedLands = landData => {
  const landTypes = Object.keys(landData)
  const randomisedLands = landTypes.reduce((newLands, landType) => {
    const possibleLands = landData[landType].filter(land => land.selectable)
    newLands[landType] = possibleLands[getRandomInt(possibleLands.length)]
    return newLands
  }, {})

  return randomisedLands
}

export const changeLandsInDeck = (deck, lands) => {
  const deckArray = deck.split('\n')
  const newDeckArray = deckArray.map(card => {
    const splitCard = card.split(' ')
    if (splitCard.length === 4) {
      const [count, name] = splitCard
      if (name in lands) {
        return `${count} ${lands[name].name}`
      }
    }

    return card
  })

  return newDeckArray.join('\n')
}
