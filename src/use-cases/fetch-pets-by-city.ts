import { Pet } from '@/interfaces/pet'
import { User } from '@/interfaces/user'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

interface FetchPetsByCityUseCaseResponse {
  users: User[]
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private usersRepoitory: UsersRepository) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const users = await this.usersRepoitory.findByCity(city)

    const pets: Pet[] = []

    for (const user of users) {
      pets.push(...user.pets)
    }

    return { users, pets }
  }
}
