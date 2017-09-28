import express from 'express'

import { getPageBeerList, getAllBeerList, getBeerDetail } from '../modules/beer'

const router = express.Router()

router.get('/', async (req, res, next) => {
  let results = null
  if (!req.query.type || req.query.type !== 'all') {
    results = await getPageBeerList(req)
  } else {
    results = await getAllBeerList(req.query.name)
  }

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
