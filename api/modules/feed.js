import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'
import User from '../models/user'
import FeedImage from  '../models/feedImage'

export async function getFeedList (req) {
  let findFeeds = Feed.find({is_ok: 1}).sort({crt_dt: -1})

  if (!req.query.type || req.query.type !== 'all') {
    const page = (!req.query.page || req.query.page <= 0)
      ? 1 : req.query.page
    const count = (!req.query.count || req.query.count <= 0)
      ? 20 : req.query.count
    findFeeds = findFeeds.limit(Number(count)).skip((page-1) * count)
  }

  const feeds = await findFeeds.populate(['beers', 'pub', 'user'])
    .exec((err, feeds) => {
    if (err) {
      return null
    }
    return feeds
  })

  return _appendFeedImages(feeds)
}


export async function getPubFeedList (pub_id) {
  const feeds = await Feed.find({is_ok: 1, pub: pub_id}).sort({crt_dt: -1})
    .populate(['beers', 'pub', 'user']).exec((err, feeds) => {
    if (err) {
      return null
    }
    return feeds
  })
  return _appendFeedImages(feeds)
}


export async function getBeerFeedList (beer_id) {
  const feeds = await Feed.find({is_ok: 1, beers: beer_id })
  .sort({crt_dt: -1}).populate(['beers', 'pub', 'user']).exec((err, feeds) => {
    if (err) {
      return null
    }
    return feeds
  })
  return _appendFeedImages(feeds)
}


function _appendFeedImages (feeds) {
  return Promise.all(feeds.map(async (v, k) => {
    await FeedImage.find({is_ok: 1, feed: v._id}).sort({crt_dt: 1}).exec((err, feedImages) => {
      if (err) {
        return null
      }
      v._images = feedImages
    })
    return v
  })).then(feeds => {
    return feeds
  })
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
  const savedFeed = await newFeed.save((err, savedFeed) => {
    if (err) {
      return null
    }
    _saveImages(req.files.feedImages, savedFeed._id)
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

function _saveImages (feedImages, feed_id) {
  if (!feedImages) {
    return null
  }
  return feedImages.map(async (v, k) => {
    let newImage = new FeedImage()
    newImage.feed = await Feed.findOne({is_ok: 1, _id: feed_id})
    newImage.image = 'feeds/' + v.filename
    newImage.is_ok = 1
    newImage.crt_dt = new Date()
    newImage.udt_dt = newImage.crt_dt
    await newImage.save((err, image) => {
      if (err) {
        return null
      }
    })
    return newImage
  })
}


/**
  NOTE: 피드 수정
  TODO: (저장 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export async function updateFeed (req) {
  await FeedImage.updateMany({feed: req.params.feed_id},
    {is_ok: 0, udt_dt: new Date()}).exec((err, feedImage) => {
    if (err) {
      return null
    }
  })
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
    })
  }).populate(['beers', 'pub', 'user']).exec((err, feed) => {
    if (err) {
      return null
    }
    _saveImages(req.files.feedImages, req.params.feed_id)
    return feed
  })
}


/**
  NOTE: 피드 삭제 (삭제 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export async function deleteFeed (feed_id) {
  await FeedImage.updateMany({feed: feed_id}, {is_ok: 0, udt_dt: new Date()})
    .exec((err, feedImage) => {
    if (err) {
      return null
    }
  })
  return await Feed.updateOne({_id: feed_id}, {is_ok: 0, udt_dt: new Date()})
    .exec((err, feed) => {
    if (err) {
      return null
    }
    return feed
  })
}


/**
  NOTE: 피드 이미지 삭제 (이미지만 지울 수 있도록)
**/
export function deleteFeedImage (feedImage_id) {
  return FeedImage.updateOne({_id: feedImage_id}, {is_ok: 0, udt_dt: new Date()})
    .exec((err, feedImage) => {
    if (err) {
      return null
    }
    return feedImage
  })
}
