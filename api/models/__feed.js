import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('__Feed', new Schema({
  road_id: String,
  contents: String,
  walk_langth: Number,
  walk_time: Number,
  walk_count: Number,
  is_ok: Number,
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
}, { autoIndex: true, versionKey: false }))
