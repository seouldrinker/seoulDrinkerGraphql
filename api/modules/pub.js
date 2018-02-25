import Pub from '../models/pub'
import Feed from '../models/feed'

const SOMEWHERE_PUB = '59ec86ae32cb539aa68cca0e'


async function _appendPubExecuter (models, popArray=[]) {
  return await models.populate(popArray)
    .exec((err, pubs) => {
    if (err) {
      return null
    }
    return pubs
  })
}


export async function getPubList (keyword) {
  const findPubs = Pub.find({is_ok: 1}).sort({kor_name: 1})
  const pubs = await _appendPubExecuter(findPubs)

  // 어딘가 펍 최상단으로 이동.
  const somewherePubIndex = pubs.findIndex(pub => {
    return pub._id.toString() === SOMEWHERE_PUB
  })
  const somewherePub = pubs[somewherePubIndex]
  pubs.splice(somewherePubIndex, 1)
  pubs.unshift(somewherePub)

  if (keyword) {
    const newPubs = Object.assign([], pubs)
    const tempPubs = newPubs.filter(pub => {
      return pub.eng_name.toUpperCase().indexOf(keyword.toUpperCase()) >= 0
        || pub.kor_name.toUpperCase().indexOf(keyword.toUpperCase()) >= 0
    })
    return tempPubs
  }
  return pubs
}


export async function getPubRankList () {
  const findPubs = Pub.find({is_ok: 1})
  const findFeeds = Feed.find({is_ok: 1})
  let pubs = await _appendPubExecuter(findPubs, ['brewery'])
  let feeds = await _appendPubExecuter(findFeeds, ['pub', 'beers'])

  pubs.map(pub => {
    pub._feedCount = 0
    feeds.map(feed => {
      if (pub._id.equals(feed.pub._id)) {
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
    rankedPub[k] = v
  })
  return rankedPub
}


export async function getPubDetail (pub_id) {
  if (pub_id.length !== 24) {
    return null
  }

  return await Pub.findOne({is_ok: 1, _id: pub_id}).sort({crt_dt: -1})
}
