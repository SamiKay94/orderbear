export const state = () => ({})
export const actions = {
  async nuxtClientInit({ dispatch, state }) {
    if (state.localStorage.auth) await dispatch('auth/refresh', true)
  }
}
