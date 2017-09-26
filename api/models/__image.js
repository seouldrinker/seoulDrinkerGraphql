import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('__Image', new Schema({
  road_id: String,
  image_url: String,
  is_map: Number,
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
