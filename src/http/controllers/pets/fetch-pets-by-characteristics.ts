import { makeFetchPetsCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-characteristics'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByCharacteristics(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const fetchPetsByCityQuerySchema = z.object({
    age: z.enum(['NEWBORN', 'JUNIOR', 'TEEN', 'FULL_GROWN']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energyLevel: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).optional(),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    requiredEnvironment: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const data = fetchPetsByCityQuerySchema.parse(req.query)

  const useCase = makeFetchPetsCharacteristicsUseCase()

  const { pets } = await useCase.execute(data)

  res.status(200).send(pets)
}
