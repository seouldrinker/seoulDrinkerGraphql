import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('__Reward', new Schema({
  category: String,
  is_ok: Number,
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
}, { autoIndex: true, versionKey: false }))
