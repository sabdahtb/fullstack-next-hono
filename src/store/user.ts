import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { EncryptedStorage } from './encryption'

export interface IUser {
  name: string
  email: string
  password: string
  remember: boolean
  imageUrl: string
  expired: number
}

export interface IUserState {
  user: IUser
  setUser: (user: IUser) => void
}

export const useUser = create<IUserState, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      user: {
        name: '',
        email: '',
        expired: 0,
        imageUrl: '',
        password: '',
        remember: false,
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'z-user',
      storage: new EncryptedStorage(),
    } as PersistOptions<IUserState>
  )
)

export const defaultUser: IUser = {
  name: '',
  email: '',
  expired: 0,
  imageUrl: '',
  password: '',
  remember: false,
}
