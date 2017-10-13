import Pub from '../models/pub'
import Brewery from '../models/brewery'

function _filteredPubList (keyword) {
  let pubList = Pub.find({is_ok: 1})
  if (keyword) {
    pubList = Pub.find({is_ok: 1, $or: [
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
      }, {
        location: {
          $regex: '.*' + keyword + '.*',
          $options: 'i'
        }
      }
    ]})
  }
  return pubList
}

export function getPubList (req) {
  let findPubs = _filteredPubList(req.query.keyword).sort({crt_dt: -1})

  if (!req.query.type || req.query.type !== 'all') {
    const page = (!req.query.page || req.query.page <= 0)
      ? 1 : req.query.page
    const count = (!req.query.count || req.query.count <= 0)
      ? 20 : req.query.count
    findPubs = findPubs.limit(Number(count)).skip((page-1) * count)
  }

  return findPubs.exec((err, pubList) => {
    if (err) {
      return null
    }
    return pubList
  })
}

export function getPubDetail (pub_id) {
  if (pub_id.length !== 24) {
    return null
  }

  return Pub.findOne({is_ok: 1, _id: pub_id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, pub) => {
    if (err) {
      return null
    }
    return pub
  })
}
