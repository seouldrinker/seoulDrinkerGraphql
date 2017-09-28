import express from 'express'

import { getBeerList, getBeerDetail } from '../modules/beer'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const results = await getBeerList(req.query.name)
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
  const results = await getBeerDetail(req.params.id)
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
