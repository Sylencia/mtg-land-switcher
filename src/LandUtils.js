import lands from './data/lands.json'

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

export const randomiseLands = deck => {
  const landTypes = Object.keys(lands)
  const randomisedLands = landTypes.reduce((newLands, landType) => {
    const possibleLands = lands[landType]
    newLands[landType] = possibleLands[getRandomInt(possibleLands.length)]
    return newLands
  }, {})

  const deckArray = deck.split('\n')
  const newDeckArray = deckArray.map(card => {
    const splitCard = card.split(' ')
    if (splitCard.length === 4) {
      const [count, name] = splitCard
      if (name in randomisedLands) {
        return `${count} ${randomisedLands[name]}`
      }
    }

    return card
  })

  return newDeckArray.join('\n')
}
