import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'
import User from '../models/user'


function _appendFeedPager (models, query) {
  if (!query.type || query.type !== 'all') {
    const page = (!query.page || query.page <= 0)
      ? 1 : query.page
    const count = (!query.count || query.count <= 0)
      ? 20 : query.count
    return models.limit(Number(count)).skip((page-1) * count)
  }
  return models
}


async function _appendFeedCounter (models, query) {
  const count = await Feed.count({}, (err, count) => {
    return count
  })

  return {
    feedList: models,
    currentPage: query.page || 1,
    totalPage: parseInt(count / (query.count || 20)) <= 0 ?
      1 : parseInt(count / (query.count || 20))
  }
}


async function _appendFeedExecuter (models, popArray, query) {
  return await models.populate(popArray)
    .exec((err, feeds) => {
    if (err) {
      return null
    }
    return feeds
  })
}


export async function getFeedList (req) {
  const findFeeds = _appendFeedPager(Feed.find({is_ok: 1})
    .sort({crt_dt: -1}), req.query)
  const feeds = await _appendFeedExecuter(findFeeds, ['beers', 'pub', 'user'])
  return await _appendFeedCounter(feeds, req.query)
}


export async function getPubFeedList (pub_id, req) {
  const findFeeds = _appendFeedPager(Feed.find({is_ok: 1, pub: pub_id})
    .sort({crt_dt: -1}), req.query)
  const feeds = await _appendFeedExecuter(findFeeds, ['beers', 'pub', 'user'])
  return await _appendFeedCounter(feeds, req.query)
}


export async function getBeerFeedList (beer_id, req) {
  const findFeeds = _appendFeedPager(Feed.find({is_ok: 1, beers: beer_id })
    .sort({crt_dt: -1}), req.query)
  const feeds = await _appendFeedExecuter(findFeeds, ['beers', 'pub', 'user'])
  return await _appendFeedCounter(feeds, req.query)
}


export async function getUserFeedList (user_id, req) {
  const findFeeds = _appendFeedPager(Feed.find({is_ok: 1, user: user_id })
    .sort({crt_dt: -1}), req.query)
  const feeds = await _appendFeedExecuter(findFeeds, ['beers', 'pub', 'user'])
  return await _appendFeedCounter(feeds, req.query)
}


/**
  NOTE: 피드 저장 (저장 전에 이미지들 부터 저장 후 진행)
**/
export async function insertFeed (req) {
  let newFeed = new Feed()
  newFeed.beers = await Beer.find({is_ok: 1, _id: {
    $in: req.body.beer_ids
  }}).exec((err, beers) => {
    if (err) {
      return null
    }
    return beers
  })
  newFeed.pub = await Pub.findOne({is_ok: 1,
    _id: req.body.pub_id}).exec((err, pub) => {
    if (err) {
      return null
    }
    return pub
  })
  newFeed.user = await User.findOne({is_ok: 1,
    id: req.query.id, platform: req.query.platform}).exec((err, user) => {
    if (err) {
      return null
    }
    return user
  })
  newFeed.context = req.body.context || ''
  newFeed.is_ok = 1
  newFeed.crt_dt = new Date()
  newFeed.udt_dt = newFeed.crt_dt
  newFeed.image = req.files.feedImage
  const savedFeed = await newFeed.save((err, savedFeed) => {
    if (err) {
      return null
    }
    return savedFeed
  })
  return Feed.populate(savedFeed, [
    {path: 'beers', model: 'Beer'},
    {path: 'pub', model: 'Pub'},
    {path: 'user', model: 'User'}
  ], (err, feed) => {
    if (err) {
      return null
    }
    return feed
  })
}


/**
  NOTE: 피드 수정
  TODO: (저장 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export async function updateFeed (req) {
  return await Feed.updateOne({_id: req.params.feed_id}, {
    udt_dt: new Date(),
    context: req.body.context || '',
    beers: await Beer.find({is_ok: 1, _id: {
      $in: req.body.beer_ids
    }}).exec((err, beers) => {
      if (err) {
        return null
      }
      return beers
    }),
    pub: await Pub.findOne({is_ok: 1,
      _id: req.body.pub_id}).exec((err, pub) => {
      if (err) {
        return null
      }
      return pub
    }),
    user: await User.findOne({is_ok: 1,
      id: req.query.id, platform: req.query.platform}).exec((err, user) => {
      if (err) {
        return null
      }
      return user
    }),
    image: req.files.feedImage
  }).populate(['beers', 'pub', 'user']).exec((err, feed) => {
    if (err) {
      return null
    }
    return feed
  })
}


/**
  NOTE: 피드 삭제 (삭제 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export async function deleteFeed (feed_id) {
  return await Feed.updateOne({_id: feed_id}, {is_ok: 0, udt_dt: new Date()})
    .exec((err, feed) => {
    if (err) {
      return null
    }
    return feed
  })
}
