import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Pub', new Schema({
  kor_name: String,
  eng_name: String,
  location: String,
  phone: String,
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
