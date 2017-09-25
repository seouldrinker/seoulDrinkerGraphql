import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Feed', new Schema({
  context: String,
  beers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
  pubs: [{ type: Schema.Types.ObjectId, ref: 'Pub' }],
  feedImages: [{ type: Schema.Types.ObjectId, ref: 'FeedImage' }],
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
