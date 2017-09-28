import News from '../models/news'
import Brewery from '../models/brewery'

export function getNewsList (location) {
  return News.find({is_ok: 1}).sort({crt_dt: -1})
    .exec((err, newsList) => {
    if (err) {
      return null
    }
    return newsList
  })
}
