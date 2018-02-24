import express from 'express'

import feed from './feed'
import pub from './pub'
import beer from './beer'
import news from './news'
import user from './user'

import { checkAuth } from '../middleware/authentication'

const router = express.Router()

router.use('/static', express.static(__dirname + '/../../images'))

// [auth]
// router.use(checkAuth)

router.use('/seoulDrinkerGraphql/vbeta/feed', feed)
router.use('/seoulDrinkerGraphql/vbeta/pub', pub)
router.use('/seoulDrinkerGraphql/vbeta/beer', beer)
router.use('/seoulDrinkerGraphql/vbeta/news', news)
router.use('/seoulDrinkerGraphql/vbeta/user', user)

export default router
