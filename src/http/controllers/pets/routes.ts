import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    register,
  )
}
