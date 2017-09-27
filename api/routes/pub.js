import express from 'express'

import { getPubList, getPubDetail } from '../modules/pub'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const results = await getPubList(req.query.location, next)
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
  const results = await getPubDetail(req.params.id, next)
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
