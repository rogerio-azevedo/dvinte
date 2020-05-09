import Logs from '../schemas/Logs'
import { saveMessage } from '../../websocket'

const { utcToZonedTime } = require('date-fns-tz')

class ChatController {
  async index(req, res) {
    const log = await Logs.find()

    const mensages = log.map(c => ({
      id: c.id,
      user: c.user,
      date: utcToZonedTime(c.createdAt),
      message: c.message,
    }))

    return res.json(mensages)
  }

  async store(req, res) {
    const chat = await Logs.create(req.body)

    const message = {
      id: chat.id,
      user: chat.user,
      date: utcToZonedTime(chat.createdAt),
      message: chat.message,
    }
    saveMessage(message)

    return res.json(chat)
  }
}

export default new ChatController()
