import { hash } from 'bcryptjs'
import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1 647-675-3313',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      passwordHash: await hash('123456', 6),
      address: {
        create: {
          street: 'Deerford Rd.',
          number: 12,
          city: 'Toronto',
          state: 'ON',
          zipCode: 'M2J 3J3',
          town: 'Don Valley Village',
        },
      },
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
