export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  async login({ dispatch, commit }, { email, password }) {
    await this.$axios
      .post('/login', {
        email,
        password
      })
      .then((res) => {
        this.$axios.setToken(res.data, 'Bearer')
        commit('localStorage/LOGIN', null, {
          root: true
        })
        dispatch('getUser')
        setInterval(() => {
          dispatch('refresh', false)
        }, 1000 * 60 * 12)
        this.$router.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async refresh({ dispatch }, repeat) {
    await this.$axios
      .post('/refresh')
      .then((res) => {
        this.$axios.setToken(res.data, 'Bearer')
        dispatch('getUser')
        if (repeat)
          setInterval(() => {
            dispatch('refreshInterval', false)
          }, 1000 * 60 * 12)
      })
      .catch((err) => {
        console.log('not refreshed')
        console.error(err)
      })
  },

  refreshInterval({ dispatch }) {
    dispatch('refresh', false)
  },

  async getUser({ commit }) {
    await this.$axios
      .post('/me')
      .then((res) => {
        commit('SET_USER', res.data.user)
      })
      .catch((err) => console.err(err))
  },
  async logout({ commit }) {
    commit('SET_USER', null)
    commit('localStorage/LOGOUT', null, {
      root: true
    })
    await this.$axios
      .post('logout')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.error(err))

    this.$axios.setToken(false)
  }
}
