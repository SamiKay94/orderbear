export const state = () => ({
  auth: false
})

export const mutations = {
  LOGIN(state) {
    state.auth = true
  },
  LOGOUT(state, rootState) {
    state.auth = false
    rootState.auth.user = null
  }
}
