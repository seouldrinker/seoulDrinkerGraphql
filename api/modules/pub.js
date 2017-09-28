import Pub from '../models/pub'
import Brewery from '../models/brewery'

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

export function getPagePubList (req) {
  const page = (!req.query.page || req.query.page <= 0) ? 1 : req.query.page
  const count = (!req.query.count || req.query.count <= 0) ? 20 : req.query.count

  return _filteredPubList(req.query.location).sort({crt_dt: -1})
    .limit(Number(count)).skip((page-1) * count).exec((err, pubList) => {
    if (err) {
      return null
    }
    return pubList
  })
}

export function getAllPubList (location) {
  return _filteredPubList(location).sort({crt_dt: -1})
    .exec((err, pubList) => {
    if (err) {
      return null
    }
    return pubList
  })
}

export function getPubDetail (id) {
  if (id.length !== 24) {
    return null
  }

  return Pub.findOne({is_ok: 1, _id: id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, pub) => {
    if (err) {
      return null
    }
    return pub
  })
}
