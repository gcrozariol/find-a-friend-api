export interface Pet {
  id: string
  name: string
  bio: string | null
  age: 'NEWBORN' | 'JUNIOR' | 'TEEN' | 'FULL_GROWN'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energyLevel: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  independencyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  requiredEnvironment: 'SMALL' | 'MEDIUM' | 'LARGE'
  photos: string[]
  adoptionRequests: string[]
  createdAt: Date
}
