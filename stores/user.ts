import { defineStore } from 'pinia'

export interface User {
  id: number | string
  name: string
  age: number
}
export type UserInput = Omit<User, 'id'>

const API = '/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    list: [] as User[],
    loading: false,
  }),
  actions: {
    setUsers(u: User[]) {
      this.list = u
    },

    async createUser(payload: UserInput) {
      const { $axios } = useNuxtApp()
      const { data } = await $axios.post<User>(API, payload)
      return data
    },

    async updateUser(user: User) {
      const { $axios } = useNuxtApp()
      const { data } = await $axios.put<User>(API, user)
      return data
    },

    async deleteUser(id: User['id']) {
      const { $axios } = useNuxtApp()
      const { data } = await $axios.delete(`${API}/${id}`)
      return data
    },
  },
})
