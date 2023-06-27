import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const addressBodyScehma = z.object({
    street: z.string(),
    number: z.coerce.number(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    town: z.string().optional(),
  })

  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    role: z.enum(['MEMBER', 'ADMIN']).default('MEMBER'),
    password: z.string(),
    address: addressBodyScehma,
  })

  const data = registerUserBodySchema.parse(req.body)

  const registerUseCase = makeRegisterUserUseCase()

  try {
    await registerUseCase.execute(data)
    res.status(201).send()
  } catch (e) {
    if (e instanceof UserAlreadyExistsError) {
      res.status(409).send({
        message: e.message,
      })
    }

    res.status(500).send()
  }
}
