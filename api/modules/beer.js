import Beer from '../models/beer'
import Brewery from '../models/brewery'

function _filteredBeerList (name) {
  let beerList = Beer.find({is_ok: 1})
  if (name) {
    beerList = Beer.find({is_ok: 1, $or: [
      {
        eng_name: {
          $regex: '.*' + name + '.*',
          $options: 'i'
        }
      }, {
        kor_name: {
          $regex: '.*' + name + '.*',
          $options: 'i'
        }
      }
    ]})
  }
  return beerList
}

export function getBeerList (req) {
  let findBeers = _filteredBeerList(req.query.name).sort({crt_dt: -1})

  if (!req.query.type || req.query.type !== 'all') {
    const page = (!req.query.page || req.query.page <= 0)
      ? 1 : req.query.page
    const count = (!req.query.count || req.query.count <= 0)
      ? 20 : req.query.count
    findBeers = findBeers.limit(Number(count)).skip((page-1) * count)
  }

  return findBeers.exec((err, beerList) => {
    if (err) {
      return null
    }
    return beerList
  })
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
