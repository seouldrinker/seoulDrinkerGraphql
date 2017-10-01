import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'
import User from '../models/user'
import FeedImage from  '../models/feedImage'

export function getFeedList (req) {
  let findFeeds = Feed.find({is_ok: 1}).sort({crt_dt: -1})

  if (!req.query.type || req.query.type !== 'all') {
    const page = (!req.query.page || req.query.page <= 0)
      ? 1 : req.query.page
    const count = (!req.query.count || req.query.count <= 0)
      ? 20 : req.query.count
    findFeeds = findFeeds.limit(Number(count)).skip((page-1) * count)
  }

  return findFeeds.populate('beers', 'pub', 'user').exec((err, feeds) => {
    if (err) {
      return null
    }
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

function _saveImages (feedImages, feedId) {
  if (!feedImages) {
    return null
  }
  return feedImages.map(async (v, k) => {
    let newImage = new FeedImage()
    newImage.feed = await Feed.findOne({is_ok: 1, _id: feedId})
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
export function updateFeed (req) {

}


/**
  NOTE: 피드 삭제 (삭제 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function deleteFeed (feedId) {

}
