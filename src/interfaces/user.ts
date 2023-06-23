interface Address {
  id: string
  street: string
  number: number
  town: string | null
  city: string
  state: string
  zipCode: string
}

export interface User {
  id: string
  name: string
  phone: string
  email: string
  passwordHash: string
  role: 'ADMIN' | 'MEMBER'
  address: Address
}
