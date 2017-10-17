import Pub from '../models/pub'
import Feed from '../models/feed'
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

  return await _appendPubPageCounter(pubs, req.query)
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
    pub.feedList = await Feed.find({is_ok: 1, pub: pub._id}).exec((err, feeds) => {
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

  pub.feedList = await Feed.find({is_ok: 1, pub: pub_id}).exec((err, feed) => {
    if (err) {
      return null
    }
    return feed
  })

  return pub
}
