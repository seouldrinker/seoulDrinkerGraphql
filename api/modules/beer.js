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


function _appendBeerPager (models, query) {
  if (!query.type || query.type !== 'all') {
    const page = (!query.page || query.page <= 0)
      ? 1 : query.page
    const count = (!query.count || query.count <= 0)
      ? 20 : query.count
    return models.limit(Number(count)).skip((page-1) * count)
  }
  return models
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


async function _appendBeerPageCounter (models, query) {
  const count = await Beer.count({}, (err, count) => {
    return count
  })

  const totalPage = parseInt(count / (query.count || 20)) <= 0 ?
    0 : parseInt(count / (query.count || 20))
  const lastPage = parseInt(count % (query.count || 20)) <= 0 ?
    0 : 1

  return {
    beerList: await models,
    currentPage: query.page || 1,
    totalPage: totalPage + lastPage
  }
}


export async function getBeerList (req) {
  const findBeersCondition = _filteredBeerList(req.query.keyword).sort({crt_dt: -1})
  const findBeers = _appendBeerPager(findBeersCondition, req.query)
  const beers = await _appendBeerExecuter(findBeers, [])

  // 어딘가 펍 최상단으로 이동.
  const somewhereBeerIndex = beers.findIndex(beer => {
    return beer._id.toString() === SOMEWHERE_BEER
  })
  const somewhereBeer = beers[somewhereBeerIndex]
  beers.splice(somewhereBeerIndex, 1)
  beers.unshift(somewhereBeer)

  return await _appendBeerPageCounter(beers, req.query)
}


export async function getBeerRankList (req) {
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

  return rankedBeer
}


/*
* DEPLICATED: Fail to SYNC about Beer and Feed join.
*/
export async function getBeerFeedList (req) {
  const findBeersCondition = _filteredBeerList(req.query.keyword).sort({crt_dt: -1})
  const findBeers = _appendBeerPager(findBeersCondition, req.query)
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

  return await _appendBeerPageCounter(Promise.all(beers), req.query)
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
