import express from 'express'
import bodyParser from 'body-parser'

import { authentication } from '../middleware/authentication'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

router.get('/', (req, res) => {
  res.send(`/info`)
})

export default router

//            : /srb/vbeta/info            // 해당 사용자의 정보들. 피드 히스토리는 따로 가져오기
