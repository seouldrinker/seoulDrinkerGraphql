import Pub from '../models/pub'
import Feed from '../models/feed'
import Brewery from '../models/brewery'

const SOMEWHERE_PUB = '59ec86ae32cb539aa68cca0e'


async function _appendPubExecuter (models, popArray) {
  return await models.populate(popArray)
    .exec((err, pubs) => {
    if (err) {
      return null
    }
    return pubs
  })
}


export async function getPubList (req) {
  const findPubs = Pub.find({is_ok: 1}).sort({kor_name: 1})
  const pubs = await _appendPubExecuter(findPubs, [{
    path: 'brewery',
    model: 'Brewery'
  }])

  // 어딘가 펍 최상단으로 이동.
  const somewherePubIndex = pubs.findIndex(pub => {
    return pub._id.toString() === SOMEWHERE_PUB
  })
  const somewherePub = pubs[somewherePubIndex]
  pubs.splice(somewherePubIndex, 1)
  pubs.unshift(somewherePub)

  if (req.query && req.query.keyword) {
    const newPubs = Object.assign([], pubs)
    const tempPubs = newPubs.filter(pub => {
      return pub.eng_name.toUpperCase().indexOf(req.query.keyword.toUpperCase()) >= 0
        || pub.kor_name.toUpperCase().indexOf(req.query.keyword.toUpperCase()) >= 0
    })
    return tempPubs
  }
  return pubs
}


export async function getPubRankList (req) {
  if (!req.session.getPubRankList) {
    const findPubs = Pub.find({is_ok: 1})
    const findFeeds = Feed.find({is_ok: 1})
    let pubs = await _appendPubExecuter(findPubs, ['brewery'])
    let feeds = await _appendPubExecuter(findFeeds, ['pub', 'beers'])

    pubs.map(pub => {
      pub._feedCount = 0
      feeds.map(feed => {
        if (pub._id.toString() === feed.pub._id.toString()) {
          pub._feedCount++
          pub._feedList.push(feed)
        }
      })
    })

    pubs.sort((a, b) => {
      return b._feedCount - a._feedCount
    })

    let rankedPub = []
    pubs.map((v, k) => {
      rankedPub[k] = {
        pub: v,
        rank: (v._feedCount === 0) ? 0 : k + 1
      }
    })

    req.session.getPubRankList = rankedPub
  }

  return req.session.getPubRankList
}


export async function getPubDetail (pub_id) {
  if (pub_id.length !== 24) {
    return null
  }

  const pub = await Pub.findOne({is_ok: 1, _id: pub_id}).sort({crt_dt: -1})
    .populate('brewery').exec((err, pub) => {
    if (err) {
      return null
    }
    return pub
  })

  pub._feedList = await Feed.find({is_ok: 1, pub: pub_id}).exec((err, feed) => {
    if (err) {
      return null
    }
    return feed
  })

  return pub
}
