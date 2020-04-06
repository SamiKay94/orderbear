export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  async login({ commit }, { email, password }) {
    await this.$axios
      .post('/login', { email, password })
      .then((res) => {
        this.$axios.setToken(res.data, 'Bearer')
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
