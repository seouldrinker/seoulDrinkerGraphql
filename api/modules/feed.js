import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'
import User from '../models/user'

export function getAllFeedList (next) {
  return Feed.find({is_ok: 1}).sort({crt_dt: -1})
    .populate('beers', 'pub', 'user').exec((err, feeds) => {
    if (err) {
      let errDetail = new Error('Database failure.')
      errDetail.status = 500
      return next(errDetail)
    }
    return feeds
  })
}

export function getPageFeedList (req, next) {
  const page = (!req.query.page || req.query.page <= 0) ? 1 : req.query.page
  const count = !req.query.count ? 20 : req.query.count

  return Feed.find({is_ok: 1}).sort({crt_dt: -1})
    .limit(Number(count)).skip((page-1) * count)
    .populate('beers', 'pub', 'user').exec((err, feeds) => {
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
  
}

function _saveImages (req, next) {

}


/**
  NOTE: 피드 수정
  TODO: (저장 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function updateFeed (req, next) {

}


/**
  NOTE: 피드 삭제 (삭제 전에 기존 이미지들 및 레퍼런스 삭제)
**/
export function deleteFeed (feed_id, next) {

}
