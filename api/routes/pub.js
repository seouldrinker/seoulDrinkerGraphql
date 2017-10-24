import express from 'express'

import { getPubList, getPubRankList, getPubDetail } from '../modules/pub'

const router = express.Router()

router.get('/rank', async (req, res, next) => {
  const results = await getPubRankList(req)

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

router.get('/:pub_id', async (req, res, next) => {
  const results = await getPubDetail(req.params.pub_id)
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

router.get('/', async (req, res, next) => {
  const results = await getPubList(req)

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

export default router
