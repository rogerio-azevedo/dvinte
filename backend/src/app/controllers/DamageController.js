import Logs from '../schemas/Logs'

// import { saveMessage } from '../../websocket'

const { format, subDays, addDays, parseISO } = require('date-fns')
const { utcToZonedTime } = require('date-fns-tz')

const DateBR = utcToZonedTime(new Date(), 'America/Sao_Paulo')
const newDate = new Date()
const dateNow = Date.now()
const date1 = subDays(DateBR, 0)
const date2 = addDays(DateBR, 0)

class DamageController {
  async index(req, res) {
    const data1 = format(date1, "yyyy-MM-dd'T00:00:00")
    const data2 = format(date2, "yyyy-MM-dd'T23:59:59")
    const type = 'day'

    console.log('DATEBR', DateBR)
    console.log('NEW DATE', newDate)
    console.log('DATE NOW', dateNow)
    console.log('DATE1', date1)
    console.log('DATE2', date2)

    console.log('DATA1', data1)
    console.log('DATA2', data2)

    console.log('PARSED DATA1', parseISO(data1))
    console.log('PARSED DATA2', parseISO(data2))

    let match = {}

    if (type === 'day') {
      match = {
        $match: {
          type: 4,
          createdAt: {
            $gte: data1,
            $lte: data2,
          },
        },
      }
    } else {
      match = {
        $match: {
          type: 4,
          createdAt: {
            $gte: data1,
            $lte: data2,
          },
        },
      }
    }

    const group = {
      $group: {
        _id: { user: '$user' },
        damage: {
          $sum: '$result',
        },
      },
    }

    const project = {
      $project: {
        _id: 0,
        user: '$_id.user',
        damage: '$damage',
      },
    }

    const pipeline = [match, group, project]
    const damages = await Logs.aggregate(pipeline)

    return res.json(damages)
  }
}

export default new DamageController()
