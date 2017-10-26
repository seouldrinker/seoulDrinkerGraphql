import express from 'express'

import { getNewsList } from '../modules/news'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const results = await getNewsList(req)
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
