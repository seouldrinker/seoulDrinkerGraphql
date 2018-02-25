import News from '../models/news'
import Brewery from '../models/brewery'

export function getNewsList () {
  return News.find({is_ok: 1}).sort({crt_dt: -1})
}
