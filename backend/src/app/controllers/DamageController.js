import Logs from '../schemas/Logs'

// import { saveMessage } from '../../websocket'

const { format, subDays, addDays } = require('date-fns')
const { utcToZonedTime } = require('date-fns-tz')

const DateBR = utcToZonedTime(new Date(), 'America/Sao_Paulo')
const date1 = subDays(DateBR, 1)
const date2 = addDays(DateBR, 1)

class DamageController {
  async index(req, res) {
    const data1 = format(date1, "yyyy-MM-dd'T00:00:00")
    const data2 = format(date2, "yyyy-MM-dd'T23:59:59")

    const damages = await Logs.aggregate([
      {
        $match: { type: 4 },
      },

      {
        $group: {
          _id: { user: '$user' },
          damage: {
            $sum: '$result',
          },
        },
      },

      {
        $project: {
          _id: 0,

          user: '$_id.user',
          damage: '$damage',
        },
      },
    ])

    return res.json(damages)
  }
}

export default new DamageController()
