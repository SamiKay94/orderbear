export const state = () => ({})
export const actions = {
  async nuxtClientInit({ state }, { app }) {
    await app.$axios
      .post('/refresh')
      .then((res) => {
        console.log(res.data)
        console.log(app.$axios.headers)
        app.$axios.setToken(res.data, 'Bearer')
      })
      .catch((err) => {
        console.log('not refreshed')
        console.error(err)
      })
  }
}
