export default function({ store, redirect }) {
  if (!store.state.localStorage.auth) {
    return redirect('/login')
  }
}
