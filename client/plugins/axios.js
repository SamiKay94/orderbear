export default function({ $axios }) {
  $axios.onRequest((config) => {
    console.log('making request to ' + config.url)
  })
}
