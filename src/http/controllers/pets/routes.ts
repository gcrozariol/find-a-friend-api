import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetById } from './get-pet-by-id'
import { fetchPetsByCity } from './fetch-pets-by-city'
import { fetchPetsByCharacteristics } from './fetch-pets-by-characteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPetById)
  app.get('/pets/city/:id', fetchPetsByCity)
  app.get('/pets/characteristics', fetchPetsByCharacteristics)

  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    register,
  )
}
