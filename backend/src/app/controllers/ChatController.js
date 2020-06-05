import Logs from '../schemas/Logs'

import { saveMessage } from '../../websocket'

const { format, subDays } = require('date-fns')
const { utcToZonedTime } = require('date-fns-tz')

const DateBR = utcToZonedTime(new Date(), 'America/Sao_Paulo')
const weekDate = subDays(DateBR, 8)

class ChatController {
  async index(req, res) {
    const data1 = format(weekDate, "yyyy-MM-dd'T00:00:00")
    const data2 = format(DateBR, "yyyy-MM-dd'T23:59:59")

    const log = await Logs.find({
      createdAt: { $gte: data1, $lte: data2 },
    })

    const mensages = log.map(c => ({
      id: c.id,
      user: c.user,
      date: c.createdAt,
      message: c.message,
    }))

    return res.json(mensages)
  }

  async store(req, res) {
    const chat = await Logs.create(req.body)

    const message = {
      id: chat.id,
      user: chat.user,
      date: chat.createdAt,
      message: chat.message,
    }
    saveMessage(message)

    return res.json(chat)
  }
}

export default new ChatController()
