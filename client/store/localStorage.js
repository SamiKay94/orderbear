export const state = () => ({
  auth: false
})

export const mutations = {
  LOGIN(state) {
    state.auth = true
  },
  LOGOUT(state) {
    state.auth = false
  }
}
