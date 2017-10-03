import User from '../models/user'
import Badge from '../models/badge'
import Feed from '../models/feed'
import Beer from '../models/beer'
import Pub from '../models/pub'
import FeedImage from  '../models/feedImage'

import { appendFeedImages } from './feed'

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
    .populate(['beers', 'pub'])
    .exec((err, feeds) => {
    if (err) {
      return null
    }
    return feeds
  })

  user._feeds = await appendFeedImages(feeds)

  return user
}
