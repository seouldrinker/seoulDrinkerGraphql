import Pub from '../models/pub'
import Feed from '../models/feed'
import Brewery from '../models/brewery'

const SOMEWHERE_PUB = '59ec86ae32cb539aa68cca0e'

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


function _appendPubPager (models, query) {
  if (!query.type || query.type !== 'all') {
    const page = (!query.page || query.page <= 0)
      ? 1 : query.page
    const count = (!query.count || query.count <= 0)
      ? 20 : query.count
    return models.limit(Number(count)).skip((page-1) * count)
  }
  return models
}


async function _appendPubExecuter (models, popArray) {
  return await models.populate(popArray)
    .exec((err, pubs) => {
    if (err) {
      return null
    }
    return pubs
  })
}


async function _appendPubPageCounter (models, query) {
  const count = await Pub.count({}, (err, count) => {
    return count
  })

  const totalPage = parseInt(count / (query.count || 20)) <= 0 ?
    0 : parseInt(count / (query.count || 20))
  const lastPage = parseInt(count % (query.count || 20)) <= 0 ?
    0 : 1

  return {
    pubList: await models,
    currentPage: query.page || 1,
    totalPage: totalPage + lastPage
  }
}


export async function getPubList (req) {
  const findPubsCondition = _filteredPubList(req.query.keyword).sort({crt_dt: -1})
  const findPubs = _appendPubPager(findPubsCondition, req.query)
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

  return await _appendPubPageCounter(pubs, req.query)
}


export async function getPubRankList (req) {
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

  return rankedPub
}


/*
* DEPLICATED: Fail to SYNC about Pub and Feed join.
*/
export async function getPubFeedList (req) {
  const findPubsCondition = _filteredPubList(req.query.keyword).sort({crt_dt: -1})
  const findPubs = _appendPubPager(findPubsCondition, req.query)
  let pubs = await _appendPubExecuter(findPubs, [{
    path: 'brewery',
    model: 'Brewery'
  }])

  pubs.map(async pub => {
    pub._feedList = await Feed.find({is_ok: 1, pub: pub._id}).exec((err, feeds) => {
      if (err) {
        return null
      }
      return feeds
    })
    return await pub
  })

  return await _appendPubPageCounter(Promise.all(pubs), req.query)
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
