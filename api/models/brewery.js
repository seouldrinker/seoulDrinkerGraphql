import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Brewery', new Schema({
  kor_name: String,
  eng_name: String,
  about: String,
  est: String,
  location: String,
  phone: String,
  homepage: String,
  logo_image: String,
  brand_image: String,
  beers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
  pubs: [{ type: Schema.Types.ObjectId, ref: 'Pub' }],
  is_ok: 1,
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
}, { autoIndex: true, versionKey: false }))
