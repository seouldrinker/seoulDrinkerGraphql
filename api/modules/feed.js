import Image from '../models/image'
import Feed from '../models/feed'
import User from '../models/user'
import Reward from '../models/reward'

/**
  NOTE: 전체 경로 조회 (한꺼번에)
**/
export function getAllFeedList (next) {
  return Feed.find({is_ok: 1}).sort({crt_dt: -1})
    .populate('images').exec((err, feeds) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feeds
  })
}


/**
  NOTE: 전체 경로 조회 (페이지 단위)
**/
export function getPageFeedList (req, next) {
  const page = (!req.query.page || req.query.page <= 0) ? 1 : req.query.page
  const count = !req.query.count ? 20 : req.query.count

  return Feed.find({is_ok: 1}).sort({crt_dt: -1})
    .limit(Number(count)).skip((page-1) * count)
    .populate('images').exec((err, feeds) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feeds
  })
}


/**
  NOTE: 피드 저장 (저장 전에 이미지들 부터 저장 후 진행)
**/
export function insertFeed (req, next) {
  let errDetail = new Error('Database failure.')
  errDetail.status = 500

  return User.findOne({id: req.query.id, platform: req.query.platform})
    .populate('feeds', 'rewards').exec(async (err, user) => {
    let newFeed = new Feed()
    newFeed.road_id = req.body.road_id || 0
    newFeed.contents = req.body.contents
    newFeed.walk_langth = req.body.walk_langth || 0
    newFeed.walk_time = req.body.walk_time || 0
    newFeed.walk_count = req.body.walk_count || 0
    newFeed.images = _saveImages(req, next)
    newFeed.is_ok = 1
    newFeed.crt_dt = new Date()
    newFeed.udt_dt = newFeed.crt_dt
    const savedFeed = await newFeed.save((err, savedFeed) => {
      if (err) {
        return next(errDetail)
      }
      return savedFeed
    })
    Feed.populate(savedFeed, {path: 'images'}, (err, feed) => {
      if (err) {
        return next(errDetail)
      }
      return feed
    })

    user.feeds.push(newFeed)
    const savedUser = await user.save((err, savedUser) => {
      if (err) {
        return next(errDetail)
      }
      return savedUser
    })
    return User.populate(savedUser,
      [{path: 'feeds', model: 'Feed'}, {path: 'rewards', model: 'Reward'}],
      (err, user) => {
      if (err) {
        return next(errDetail)
      }
      return user
    })
  })
}

function _saveImages (req, next) {
  const allFiles = req.files.map.concat(req.files.photo)

  return allFiles.map((v, k) => {
    let newImage = new Image()
    newImage.road_id = req.body.road_id || 0
    newImage.image_url = req.headers.host + '/static/' + v.filename
    newImage.is_map = (v.fieldname === 'map') ? 1 : 0
    newImage.is_ok = 1
    newImage.crt_dt = new Date()
    newImage.udt_dt = newImage.crt_dt
    newImage.save((err, image) => {
      if (err) {
        let errDetail = new Error('Database failure.')
        errDetail.status = 500
        return next(errDetail)
      }
    })
    return newImage
  })
}


/**
  NOTE: 피드 수정
  TODO: (저장 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function updateFeed (req, next) {
  return Feed.findOneAndUpdate({_id: req.params.id}, {
    road_id: req.body.road_id || 0,
    contents: req.body.contents,
    walk_langth: req.body.walk_langth || 0,
    walk_time: req.body.walk_time || 0,
    walk_count: req.body.walk_count || 0,
    images: _saveImages(req, next),
    is_ok: 1,
    udt_dt: new Date()
  }).populate('images').exec((err, feed) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feed
  })
}


/**
  NOTE: 피드 삭제 (삭제 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function deleteFeed (feed_id, next) {
  return Feed.findOneAndUpdate({_id: feed_id}, {is_ok: 0})
    .populate('images').exec((err, feed) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feed
  })
}
