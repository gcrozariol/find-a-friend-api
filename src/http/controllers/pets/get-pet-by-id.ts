import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetById(req: FastifyRequest, res: FastifyReply) {
  const getPetByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetByIdParamsSchema.parse(req.params)

  const useCase = makeGetPetByIdUseCase()

  const { pet } = await useCase.execute({ id })

  res.status(200).send(pet)
}
