import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

async function createApp () {
  // const urlParams = new URLSearchParams(location.search)
  // const uid = urlParams.get('uid')
  // const token = urlParams.get('token')

  // simple URL params parsing (even decoding is not needed) to avoid url polyfill
  const urlParams = {}
  location.search.substring(1).split('&').forEach(part => {
    const [name, value] = part.split('=')
    urlParams[name] = value
  })
  const { uid, token } = urlParams
  let data = { error: true }
  if (uid && token) {
    const url = `/api/accounts/activate/${uid}/${token}/`
    const resp = await fetch(url, { method: 'POST' })
    if (resp.ok) {
      // data = await resp.json()
      data.error = false
    }
  }

  new Vue({
    render: h => h(App, { props: data })
  }).$mount('#app')
}

createApp()
