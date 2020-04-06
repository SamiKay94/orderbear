<template>
  <section class="container">
    <h1>Login</h1>
    <form @submit.prevent="submitLogin">
      <b-field label="Email">
        <b-input v-model="email"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input v-model="password" type="password"></b-input>
      </b-field>
      <b-button expanded native-type="submit" type="is-primary">Submit</b-button>
    </form>
    <h1>{{ hello }}</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: 'samkamara94@gmail.com',
      password: 'qwer1234',
      hello: this.$axios.headers
    }
  },
  methods: {
    async submitLogin() {
      await this.$store.dispatch('auth/login', { email: this.email, password: this.password })
    }
  }
}
</script>
