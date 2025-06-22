import { FastifyInstance } from 'fastify'

// Mock character tokens data
const mockCharTokens = [
  {
    id: 1,
    character_id: 1,
    token_id: 1,
    x: 100.5,
    y: 150.2,
    width: 50,
    height: 50,
    rotation: 0,
    enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image: 'http://localhost:9600/tokens/4ced03b576f249acb2b9f42b9cbe212c.png',
    tokens: {
      id: 1,
      name: 'Token Velvet',
      path: '4ced03b576f249acb2b9f42b9cbe212c.png',
      url: 'http://localhost:9600/tokens/4ced03b576f249acb2b9f42b9cbe212c.png',
    },
    character: {
      id: 1,
      name: 'VELVET PLUMLUNE',
      level: 8,
    },
  },
  {
    id: 2,
    character_id: 2,
    token_id: 2,
    x: 200.5,
    y: 250.2,
    width: 50,
    height: 50,
    rotation: 0,
    enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image: 'http://localhost:9600/tokens/78d31685e12ab7d3907114dc4be4a5b8.png',
    tokens: {
      id: 2,
      name: 'Token Warrior',
      path: '78d31685e12ab7d3907114dc4be4a5b8.png',
      url: 'http://localhost:9600/tokens/78d31685e12ab7d3907114dc4be4a5b8.png',
    },
    character: {
      id: 2,
      name: 'WARRIOR CHARACTER',
      level: 5,
    },
  },
  {
    id: 3,
    character_id: 3,
    token_id: 3,
    x: 300.5,
    y: 350.2,
    width: 50,
    height: 50,
    rotation: 0,
    enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    image: 'http://localhost:9600/tokens/ffd61488ed9fd284fe60489e1ec7c058.png',
    tokens: {
      id: 3,
      name: 'Token Mage',
      path: 'ffd61488ed9fd284fe60489e1ec7c058.png',
      url: 'http://localhost:9600/tokens/ffd61488ed9fd284fe60489e1ec7c058.png',
    },
    character: {
      id: 3,
      name: 'MAGE CHARACTER',
      level: 7,
    },
  },
]

export default async function charTokenRoutes(fastify: FastifyInstance) {
  // Get all character tokens
  fastify.get('/chartokens', async (request, reply) => {
    try {
      return reply.send(mockCharTokens)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({ error: 'Failed to fetch character tokens' })
    }
  })

  // Get character token by ID
  fastify.get('/chartokens/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }

      const token = mockCharTokens.find(t => t.id === parseInt(id))

      if (!token) {
        return reply.code(404).send({ error: 'Character token not found' })
      }

      return reply.send(token)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({ error: 'Failed to fetch character token' })
    }
  })

  // Update character token position (without ID in URL - for drag and drop)
  fastify.put('/chartokens', async (request, reply) => {
    try {
      const { id, x, y, rotation } = request.body as {
        id: number
        x?: number
        y?: number
        rotation?: number
      }

      fastify.log.info(`Updating token ${id} position:`, { x, y, rotation })

      const tokenIndex = mockCharTokens.findIndex(t => t.id === id)

      if (tokenIndex === -1) {
        return reply.code(404).send({ error: 'Character token not found' })
      }

      if (x !== undefined) mockCharTokens[tokenIndex].x = x
      if (y !== undefined) mockCharTokens[tokenIndex].y = y
      if (rotation !== undefined) mockCharTokens[tokenIndex].rotation = rotation

      mockCharTokens[tokenIndex].updated_at = new Date().toISOString()

      fastify.log.info(`Token ${id} updated successfully`)
      return reply.send(mockCharTokens[tokenIndex])
    } catch (error) {
      fastify.log.error(error)
      return reply.code(400).send({ error: 'Failed to update character token' })
    }
  })

  // Update character token position (with ID in URL - alternative route)
  fastify.put('/chartokens/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }
      const { x, y, rotation } = request.body as {
        x?: number
        y?: number
        rotation?: number
      }

      const tokenIndex = mockCharTokens.findIndex(t => t.id === parseInt(id))

      if (tokenIndex === -1) {
        return reply.code(404).send({ error: 'Character token not found' })
      }

      if (x !== undefined) mockCharTokens[tokenIndex].x = x
      if (y !== undefined) mockCharTokens[tokenIndex].y = y
      if (rotation !== undefined) mockCharTokens[tokenIndex].rotation = rotation

      mockCharTokens[tokenIndex].updated_at = new Date().toISOString()

      return reply.send(mockCharTokens[tokenIndex])
    } catch (error) {
      fastify.log.error(error)
      return reply.code(400).send({ error: 'Failed to update character token' })
    }
  })
}
