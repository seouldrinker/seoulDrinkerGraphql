import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Beer', new Schema({
  brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
  kor_name: String,
  eng_name: String,
  image: String,
  abv: String,
  feature: String,
  style: String,
  release: String,
  is_ok: {
    type: Number,
    default: 1
  },
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
}, { autoIndex: true, versionKey: false }))
