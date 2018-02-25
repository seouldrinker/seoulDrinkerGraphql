import Beer from '../models/beer'
import Feed from '../models/feed'

const SOMEWHERE_BEER = '59ec88dc32cb539aa68cca1d'


async function _appendBeerExecuter (models, popArray=[]) {
  return await models.populate(popArray)
    .exec((err, beers) => {
    if (err) {
      return null
    }
    return beers
  })
}


export async function getBeerList (keyword) {
  const findBeers = Beer.find({is_ok: 1}).sort({kor_name: 1})
  const beers = await _appendBeerExecuter(findBeers)

  // 어딘가 비어 최상단으로 이동.
  const somewhereBeerIndex = beers.findIndex(beer => {
    return beer._id.toString() === SOMEWHERE_BEER
  })
  const somewhereBeer = beers[somewhereBeerIndex]
  beers.splice(somewhereBeerIndex, 1)
  beers.unshift(somewhereBeer)

  if (keyword) {
    const newBeers = Object.assign([], beers)
    const tempBeers = newBeers.filter(beer => {
      return beer.eng_name.toUpperCase().indexOf(keyword.toUpperCase()) >= 0
        || beer.kor_name.toUpperCase().indexOf(keyword.toUpperCase()) >= 0
    })
    return tempBeers
  }
  return beers
}


export async function getBeerRankList () {
  const findBeers = Beer.find({is_ok: 1})
  const findFeeds = Feed.find({is_ok: 1})
  let beers = await _appendBeerExecuter(findBeers, ['brewery'])
  let feeds = await _appendBeerExecuter(findFeeds, ['pub', 'beers'])

  beers.map(beer => {
    beer._feedCount = 0
    feeds.map(feed => {
      const ownBeer = feed.beers.filter(feedBeer => {
        return feedBeer._id.equals(beer._id)
      })
      if (ownBeer.length > 0) {
        beer._feedCount++
        beer._feedList.push(feed)
      }
    })
  })

  beers.sort((a, b) => {
    return b._feedCount - a._feedCount
  })

  let rankedBeer = []
  beers.map((v, k) => {
    rankedBeer[k] = v
  })
  return rankedBeer
}


export async function getBeerDetail (beer_id) {
  if (beer_id.length !== 24) {
    return null
  }

  return await Beer.findOne({is_ok: 1, _id: beer_id}).sort({crt_dt: -1})
}
