import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    bio: z.string().optional(),
    age: z.enum(['NEWBORN', 'JUNIOR', 'TEEN', 'FULL_GROWN']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energyLevel: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    requiredEnvironment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    photos: z.string().array().optional(),
    adoptionRequests: z.string().array().optional(),
    userId: z.string().uuid(),
  })

  const data = registerBodySchema.parse(req.body)

  const useCase = makeRegisterPetUseCase()

  await useCase.execute({ id: randomUUID(), ...data })

  res.status(201).send()
}
