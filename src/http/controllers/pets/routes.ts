import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetById } from './get-pet-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPetById)

  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    register,
  )
}
