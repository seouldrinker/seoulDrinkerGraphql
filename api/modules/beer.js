import Beer from '../models/beer'
import Brewery from '../models/brewery'


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


async function _appendBeerCounter (models, query) {
  const count = await Beer.count({}, (err, count) => {
    return count
  })

  const totalPage = parseInt(count / (query.count || 20)) <= 0 ?
    0 : parseInt(count / (query.count || 20))
  const lastPage = parseInt(count % (query.count || 20)) <= 0 ?
    0 : 1

  return {
    beerList: models,
    currentPage: query.page || 1,
    totalPage: totalPage + lastPage
  }
}


export async function getBeerList (req) {
  const findBeersCondition = _filteredBeerList(req.query.keyword).sort({crt_dt: -1})
  const findBeers = _appendBeerPager(findBeersCondition, req.query)
  const beers = await _appendBeerExecuter(findBeers, [])
  return await _appendBeerCounter(beers, req.query)
}


export function getBeerDetail (beer_id) {
  if (beer_id.length !== 24) {
    return null
  }

  return Beer.findOne({is_ok: 1, _id: beer_id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, beer) => {
    if (err) {
      return null
    }
    return beer
  })
}
