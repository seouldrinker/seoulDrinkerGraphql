import Beer from '../models/beer'

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

export function getBeerList (name, next) {
  return _filteredBeerList(name).sort({crt_dt: -1})
    .exec((err, beerList) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return beerList
  })
}

export function getBeerDetail (id, next) {
  return Beer.findOne({is_ok: 1, _id: id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, beer) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return beer
  })
}
