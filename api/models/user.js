import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('User', new Schema({
  id: String,
  platform: String,
  feeds: [{ type: Schema.Types.ObjectId, ref: 'Feed' }],
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
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
