import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('User', new Schema({
  id: String,
  name: String,
  email: String,
  platform: String,
  picture: String,
  _feeds: Array,
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
