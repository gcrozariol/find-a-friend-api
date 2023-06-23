import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      phone: '+1 647-675-3313',
      email: 'johndoe@example.com',
      password: 'password',
      address: {
        street: 'Deerford Rd.',
        number: 12,
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M2J 3J3',
      },
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('should not be able to register a user with existing email', async () => {
    await sut.execute({
      name: 'John Doe',
      phone: '+1 647-675-3313',
      email: 'johndoe@example.com',
      password: 'password',
      address: {
        street: 'Deerford Rd.',
        number: 12,
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M2J 3J3',
      },
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        phone: '+1 647-675-3313',
        email: 'johndoe@example.com',
        password: 'password',
        address: {
          street: 'Deerford Rd.',
          number: 12,
          city: 'Toronto',
          state: 'ON',
          zipCode: 'M2J 3J3',
        },
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able validate hashed password', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'John Doe',
      phone: '+1 647-675-3313',
      email: 'johndoe@example.com',
      password,
      address: {
        street: 'Deerford Rd.',
        number: 12,
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M2J 3J3',
        town: 'Don Valley Village',
      },
    })

    const isPasswordCorrectlyHashed = await compare(password, user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
