import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    // message: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Chat', ChatSchema)
