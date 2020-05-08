import Chat from '../schemas/Chat'

class ChatController {
  async index(req, res) {
    // const { io } = req

    const chat = await Chat.find()

    return res.json(chat)
  }

  async store(req, res) {
    const chat = await Chat.create(req.body)

    return res.json(chat)
  }
}

export default new ChatController()
