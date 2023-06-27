import { makeFetchPetByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByCity(req: FastifyRequest, res: FastifyReply) {
  const fetchPetsByCityParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = fetchPetsByCityParamsSchema.parse(req.params)

  const useCase = makeFetchPetByCityUseCase()

  const { pets } = await useCase.execute({ cityId: id })

  res.status(200).send(pets)
}
