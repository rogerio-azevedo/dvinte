import sharp from 'sharp'
import fs from 'fs'
import Token from '../models/Token'

const path = require('path')

class TokenController {
  async index(req, res) {
    const list = await Token.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const {
      originalname: fileName,
      filename: newName,
      destination: folder,
      path: fullPath,
    } = req.file

    await sharp(fullPath)
      .resize(500)
      .png({ quality: 80 })
      .toFile(path.resolve(folder, 'tokens', newName))

    fs.unlinkSync(fullPath)

    const file = await Token.create({
      name: fileName,
      path: newName,
    })

    return res.json(file)
  }
}

export default new TokenController()
