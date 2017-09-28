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

export function getPageBeerList (req) {
  const page = (!req.query.page || req.query.page <= 0) ? 1 : req.query.page
  const count = (!req.query.count || req.query.count <= 0) ? 20 : req.query.count

  return _filteredBeerList(req.query.name).sort({crt_dt: -1})
    .limit(Number(count)).skip((page-1) * count).exec((err, beerList) => {
    if (err) {
      return null
    }
    return beerList
  })
}

export function getAllBeerList (name) {
  return _filteredBeerList(name).sort({crt_dt: -1})
    .exec((err, beerList) => {
    if (err) {
      return null
    }
    return beerList
  })
}

export function getBeerDetail (id) {
  if (id.length !== 24) {
    return null
  }

  return Beer.findOne({is_ok: 1, _id: id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, beer) => {
    if (err) {
      return null
    }
    return beer
  })
}
