import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Feed', new Schema({
  beers: [{ type: Schema.Types.ObjectId, ref: 'Beer' }],
  pub: { type: Schema.Types.ObjectId, ref: 'Pub' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  context: String,
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
