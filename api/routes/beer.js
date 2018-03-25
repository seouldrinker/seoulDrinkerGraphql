import express from 'express'

import { getBeerList, getBeerRankList, getBeerDetail } from '../modules/beer'

const router = express.Router()

router.get('/rank', async (req, res, next) => {
  const results = await getBeerRankList(req)

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

router.get('/:beer_id', async (req, res, next) => {
  const results = await getBeerDetail(req.params.beer_id)
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
  const results = await getBeerList(req.query.keyword || null)

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
