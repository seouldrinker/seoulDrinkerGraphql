import express from 'express'
import bodyParser from 'body-parser'

import { insertFeed, updateFeed, deleteFeed, getAllFeedList, getPageFeedList } from '../modules/feed'
import { imageUpload } from '../middleware/image'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

router.route('/').get(async (req, res, next) => {
  let results = null
  if (req.query.page) {
    results = await getPageFeedList(req, next)
  } else {
    results = await getAllFeedList(next)
  }
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results: results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
}).post(imageUpload, async (req, res, next) => {
  const results = await insertFeed(req, next)
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results: results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})

router.route('/:id').put(imageUpload, async (req, res, next) => {
  const feed = await updateFeed(req, next)
  if (feed && typeof feed !== 'undefined') {
    return res.send({
      code: 200,
      results: feed
    })
  }
  let errDetail = new Error('Have no return value')
  errDetail.status = 406
  return next(errDetail)
}).delete(async (req, res, next) => {
  const feed = await deleteFeed(req.params.id, next)
  if (feed && typeof feed !== 'undefined') {
    return res.send({
      code: 200,
      results: feed
    })
  }
  let errDetail = new Error('Have no return value')
  errDetail.status = 406
  return next(errDetail)
})

export default router

// clear      : /srb/vbeta/feed?page=2                         // 전체 피드 히스토리 조회, 피드 생성
// clear      : /srb/vbeta/feed/:id                            // 특정 피드 수정, 삭제 (특정 게시글 조회는 없음)
