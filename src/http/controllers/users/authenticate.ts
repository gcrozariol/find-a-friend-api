import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticatBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticatBodySchema.parse(req.body)

  try {
    const useCase = makeAuthenticateUseCase()
    const { user } = await useCase.execute({ email, password })

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    res
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      res.status(400).send({
        message: e.message,
      })
    }

    throw e
  }
}
