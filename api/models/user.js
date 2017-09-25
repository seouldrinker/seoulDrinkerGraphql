import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('User', new Schema({
  id: String,
  platform: String,
  is_ok: Number,
  feeds: [{ type: Schema.Types.ObjectId, ref: 'Feed' }],
  rewards: [{ type: Schema.Types.ObjectId, ref: 'Reward' }],
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
}, { autoIndex: true, versionKey: false }))
