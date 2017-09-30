import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Badge', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  context: String,
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
