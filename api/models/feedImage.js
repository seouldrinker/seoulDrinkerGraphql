import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('FeedImage', new Schema({
  feed: { type: Schema.Types.ObjectId, ref: 'Feed' },
  image: String,
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
