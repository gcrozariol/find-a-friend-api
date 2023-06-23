import { hash } from 'bcryptjs'
import { User } from '@/interfaces/user'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface AddressRequest {
  id?: string
  street: string
  number: number
  town?: string | null
  city: string
  state: string
  zipCode: string
}

export interface RegisterUseCaseRequest {
  id?: string
  name: string
  phone: string
  email: string
  password: string
  role?: 'ADMIN' | 'MEMBER'
  address: AddressRequest
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const userAlreadyRegistered = await this.usersRepository.findByEmail(
      data.email,
    )

    if (userAlreadyRegistered) {
      throw new UserAlreadyExistsError()
    }

    const password = await hash(data.password, 6)

    const user = await this.usersRepository.create({
      ...data,
      password,
    })

    return { user }
  }
}
