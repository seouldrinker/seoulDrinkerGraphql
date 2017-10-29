import Beer from '../models/beer'
import Feed from '../models/feed'
import Brewery from '../models/brewery'

const SOMEWHERE_BEER = '59ec88dc32cb539aa68cca1d'

function _filteredBeerList (keyword) {
  let beerList = Beer.find({is_ok: 1})
  if (keyword) {
    beerList = Beer.find({is_ok: 1, $or: [
      {
        eng_name: {
          $regex: '.*' + keyword + '.*',
          $options: 'i'
        }
      }, {
        kor_name: {
          $regex: '.*' + keyword + '.*',
          $options: 'i'
        }
      }
    ]})
  }
  return beerList
}


async function _appendBeerExecuter (models, popArray) {
  return await models.populate(popArray)
    .exec((err, beers) => {
    if (err) {
      return null
    }
    return beers
  })
}


export async function getBeerList (req) {
  if (!req.session.getBeerList) {
    const findBeers = _filteredBeerList(req.query.keyword).sort({eng_name: 1})
    const beers = await _appendBeerExecuter(findBeers, [])

    // 어딘가 펍 최상단으로 이동.
    const somewhereBeerIndex = beers.findIndex(beer => {
      return beer._id.toString() === SOMEWHERE_BEER
    })
    const somewhereBeer = beers[somewhereBeerIndex]
    beers.splice(somewhereBeerIndex, 1)
    beers.unshift(somewhereBeer)

    req.session.getBeerList = beers
  }
  return req.session.getBeerList
}


export async function getBeerRankList (req) {
  if (!req.session.getBeerRankList) {
    const findBeers = Beer.find({is_ok: 1})
    const findFeeds = Feed.find({is_ok: 1})
    let beers = await _appendBeerExecuter(findBeers, ['brewery'])
    let feeds = await _appendBeerExecuter(findFeeds, ['pub', 'beers'])

    beers.map(beer => {
      beer._feedCount = 0
      feeds.map(feed => {
        feed.beers.map(feedBeer => {
          if (beer._id.toString() === feedBeer._id.toString()) {
            beer._feedCount++
            beer._feedList.push(feed)
          }
        })
      })
    })

    beers.sort((a, b) => {
      return b._feedCount - a._feedCount
    })

    let rankedBeer = []
    beers.map((v, k) => {
      rankedBeer[k] = {
        beer: v,
        rank: (v._feedCount === 0) ? 0 : k + 1
      }
    })

    req.session.getBeerRankList = rankedBeer
  }

  return req.session.getBeerRankList
}


/*
* DEPLICATED: Fail to SYNC about Beer and Feed join.
*/
export async function getBeerFeedList (req) {
  const findBeers = _filteredBeerList(req.query.keyword).sort({crt_dt: -1})
  const beers = await _appendBeerExecuter(findBeers, [])

  beers.map(async beer => {
    beer._feedList = await Feed.find({is_ok: 1, beers: {
      $in: [beer._id]
    }}).exec((err, feeds) => {
      if (err) {
        return null
      }
      return feeds
    })
    return beer
  })

  return await Promise.all(beers)
}


export async function getBeerDetail (beer_id) {
  if (beer_id.length !== 24) {
    return null
  }

  const beer = await Beer.findOne({is_ok: 1, _id: beer_id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, beer) => {
    if (err) {
      return null
    }
    return beer
  })

  beer._feedList = await Feed.find({is_ok: 1, beers: {
    $in: [beer_id]
  }}).exec((err, feed) => {
    if (err) {
      return null
    }
    return feed
  })

  return beer
}
