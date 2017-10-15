import express from 'express'

import { addUser, getUserDetail } from '../modules/user'

const router = express.Router()

router.post('/', async (req, res, next) => {
  const results = await addUser(req)
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

router.get('/:user_id', async (req, res, next) => {
  const results = await getUserDetail(req.params.user_id)

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
