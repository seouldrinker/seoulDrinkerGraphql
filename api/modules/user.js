import axios from 'axios'

import User from '../models/user'
import Badge from '../models/badge'
import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'


function _fbCommonAuth(token) {
  return axios.get('https://graph.facebook.com/me?'
    + 'fields=id,name,picture,email&access_token=' + token).then(res => {
    return res.data
  }).catch(err => {
    let errDetail = new Error('You didn\'t have authentication.')
    errDetail.status = 401
    return next(errDetail)
  })
}


export async function addUser (req) {
  let id = null
  let platform = null
  let email = null
  let name = null
  let picture = null

  if (req.query.platform === 'facebook') {
    if (!req.query || !req.query.access_token) {
      return null
    }

    const user = await _fbCommonAuth(req.query.access_token)

    id = user.id || null
    platform = 'facebook'
    name = user.name || null
    email = user.email || null
    picture = user.picture.data.url || null
  } else {
    if (!req.query || !req.query.id || !req.query.platform) {
      return null
    }
    const splitedEmail = user.email ? user.email.split('@')[0] : null
    id = req.query.id
    platform = 'google'
    email = req.query.email
    name = req.query.name || splitedEmail
    picture = req.query.picture
  }

  const user = await User.findOne({'id': id, 'platform': platform})
    .exec(async (err, user) => {
    if (err) {
      return null
    }
  }).catch(e => {
    return null
  })

  if (!user) {
    let newUser = new User()
    newUser.id = id
    newUser.platform = platform
    newUser.email = email
    newUser.name = name
    newUser.picture = picture
    newUser.is_ok = 1
    newUser.crt_dt = new Date()
    newUser.udt_dt = newUser.crt_dt
    return await newUser.save((err, savedUser) => {
      if (err) {
        return null
      }
      return savedUser
    }).catch(e => {
      return null
    })
  }
  return user
}

export function updateProfile (req) {
  let picture = ''
  if (req.file && req.file.fieldname === 'profile') {
    picture = `users/${req.file.filename}`
  }

  return User.updateOne({_id: req.params.user_id}, { picture })
    .exec((err, user) => {
    if (err) {
      return null
    }
    return user
  })
}

export async function getUserDetail (user_id) {
  if (user_id.length !== 24) {
    return null
  }

  const user = await User.findOne({is_ok: 1, _id: user_id})
    .exec((err, user) => {
    if (err) {
      return null
    }
    return user
  })

  const feeds = await Feed.find({is_ok: 1, user: user._id}).sort({crt_dt: -1})
    .populate(['beers', 'pub', 'user'])
    .exec((err, feeds) => {
    if (err) {
      return null
    }
    return feeds
  })

  user._feeds = feeds

  return user
}
