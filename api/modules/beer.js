import Beer from '../models/beer'

export function getBeerList (next) {
  return Beer.find({is_ok: 1}).sort({crt_dt: -1})
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
    .populate('images').exec((err, feeds) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feeds
  })
}
