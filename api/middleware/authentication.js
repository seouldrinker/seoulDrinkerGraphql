import axios from 'axios'

import User from '../models/user'

/**
  TODO: 계정 인증 여부를 체크
**/
export function checkAuth (req, res, next) {
  const keyList = Object.keys(req.query)

  if (keyList.length > 0 && keyList.includes('token') && keyList.includes('id')
    && keyList.includes('platform')) {
    switch(req.query.platform) {
      case 'facebook':
        return _commonAuth(next,
          'https://graph.facebook.com/me?fields=id,name,picture,email&access_token=',
          req.query, true)
        break

      case 'google':
        return _commonAuth(next,
          'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=',
          req.query, true)
        break

      case 'kakaotalk':
        return _commonAuth(next,
          'https://kapi.kakao.com/v1/user/access_token_info',
          req.query, false, {
          'Authorization': 'Bearer ' + req.query.token
        })
        break
    }
  }
  let errDetail = new Error('You didn\'t have authentication.')
  errDetail.status = 401
  return next(errDetail)
}

function _commonAuth(next, url, query, includeToken, headers) {
  let mergedUrl = includeToken ? url + query.token : url
  let options = {}

  options.headers = (!headers || Object.keys(headers).length <= 0) ?
    {} : options.headers = headers

  return axios.get(mergedUrl, options).then(res => {
    if ((query.platform === 'facebook' && res.data.email == query.id)
      || (query.platform === 'google' && res.data.email == query.id)
      || (query.platform === 'kakaotalk' && res.data.id == query.id)) {
      return next()
    }
    throw 'You didn\'t have authentication.'
  }).catch(err => {
    let errDetail = new Error('You didn\'t have authentication.')
    errDetail.status = 401
    return next(errDetail)
  })
}

/**
  TODO: DB에 등록된 유저인지 체크하고, 안되어있으면 추가
**/
export function checkRegister (req, res, next) {
  let errDetail = new Error('Database failure.')
  errDetail.status = 500

  if (!req.query || !req.query.id || !req.query.platform) {
    let errDetail = new Error('You didn\'t have authentication.')
    errDetail.status = 401
    return next(errDetail)
  }

  User.findOne({'id': req.query.id, 'platform': req.query.platform})
    .exec((err, user) => {
    if (err) {
      return next(errDetail)
    }

    if (!user) {
      let newUser = new User()
      newUser.id = req.query.id
      newUser.platform = req.query.platform
      newUser.is_ok = 1
      newUser.crt_dt = new Date()
      newUser.udt_dt = newUser.crt_dt
      newUser.save((err, user) => {
        if (err) {
          return next(errDetail)
        }
      })
    }
  }).then(save => {
    return next()
  }).catch(e => {
    return next(errDetail)
  })
}
