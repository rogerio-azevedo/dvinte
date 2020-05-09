import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Logs', LogsSchema)
