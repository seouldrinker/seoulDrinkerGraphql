import News from '../models/news'
import Brewery from '../models/brewery'

export function getNewsList (req) {
  if (!req.session.getNewsList) {
    return News.find({is_ok: 1}).sort({crt_dt: -1})
      .exec((err, newsList) => {
      if (err) {
        return null
      }
      req.session.getNewsList = newsList
      return newsList
    })
  } else {
    return req.session.getNewsList
  }
}
