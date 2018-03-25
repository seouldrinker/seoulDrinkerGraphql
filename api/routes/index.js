import express from 'express'

import feed from './feed'
import pub from './pub'
import beer from './beer'
import news from './news'
import user from './user'

import { checkAuth } from '../middleware/authentication'

const router = express.Router()

// [auth]
// router.use(checkAuth)

router.use('/vbeta/feed', feed)
router.use('/vbeta/pub', pub)
router.use('/vbeta/beer', beer)
router.use('/vbeta/news', news)
router.use('/vbeta/user', user)

export default router
