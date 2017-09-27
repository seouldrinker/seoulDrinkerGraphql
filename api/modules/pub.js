import Pub from '../models/pub'

function _filteredPubList (location) {
  let pubList = Pub.find({is_ok: 1})
  if (location) {
    pubList = Pub.find({is_ok: 1, location: {
      $regex: '.*' + location + '.*',
      $options: 'i'
    }})
  }
  return pubList
}

export function getPubList (location, next) {
  return _filteredPubList(location).sort({crt_dt: -1})
    .exec((err, pubList) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return pubList
  })
}

export function getPubDetail (id, next) {
  return Pub.findOne({is_ok: 1, _id: id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, pub) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return pub
  })
}
