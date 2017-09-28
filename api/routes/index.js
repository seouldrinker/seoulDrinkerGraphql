import express from 'express'

import feed from './feed'
import pub from './pub'
import beer from './beer'
import news from './news'
import info from './info'

import { checkAuth, checkRegister } from '../middleware/authentication'

const router = express.Router()

router.use('/', express.static(__dirname + '/../../'))
router.use('/static', express.static(__dirname + '/../../images'))

// [auth]
// router.use(checkAuth)
// router.use(checkRegister)

router.use('/seoulDrinkerApi/vbeta/feed', feed)
router.use('/seoulDrinkerApi/vbeta/pub', pub)
router.use('/seoulDrinkerApi/vbeta/beer', beer)
router.use('/seoulDrinkerApi/vbeta/news', news)
router.use('/seoulDrinkerApi/vbeta/info', info)

export default router
