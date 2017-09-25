import express from 'express'

import explore from './explore'
import feed from './feed'
import info from './info'

import { checkAuth, checkRegister } from '../middleware/authentication'

const router = express.Router()

router.use('/', express.static(__dirname + '/../../'))
router.use('/static', express.static(__dirname + '/../../feeds'))

// [auth]
// router.use(checkAuth)
// router.use(checkRegister)

router.use('/srb/vbeta/explore', explore)
router.use('/srb/vbeta/feed', feed)
router.use('/srb/vbeta/info', info)

export default router

// clear      : /                          // json
// processing : /static                    // 이미지 저장 경로
