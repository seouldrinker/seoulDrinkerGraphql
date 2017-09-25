import express from 'express'
import bodyParser from 'body-parser'

import { getAllWalkCourse, getOneWalkCourse } from '../modules/explore/course'
import { getImagesOfWalkCourse } from '../modules/explore/image'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

router.get('/', async (req, res, next) => {
  const results = await getAllWalkCourse(req.session, next)
  if (results && typeof results !== 'undefined') {
    return res.send({
      code: 200,
      results
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})

router.get('/:id', async (req, res, next) => {
  const courseList = await getOneWalkCourse(encodeURIComponent(req.params.id), next)
  const imageList = await getImagesOfWalkCourse(encodeURIComponent(req.params.id), req.body, next)

  if (courseList && imageList && typeof courseList !== 'undefined' && typeof imageList !== 'undefined') {
    return res.send({
      code: 200,
      results: {
        courseList,
        imageList
      }
    })
  }
  let errDetail = new Error('Database failure.')
  errDetail.status = 500
  return next(errDetail)
})


export default router


// clear      : /srb/vbeta/explore?page=2         // 서울시 API를 읽어와서 둘레길 리스트 뿌려주기. 사용자가 올린 길 경로들에 대해서 처음 20개를 제공
// clear      : /srb/vbeta/explore/:id            // 특정 둘레길에 대한 정보. 사용자가 길 경로들에 올린 이미지는 feeds에서 따로 가져오기
