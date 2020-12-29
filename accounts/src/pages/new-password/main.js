import Vue from 'vue'
import App from './App'

// import all icons
const svgIcons = require.context('../../../icons', false, /.*\.svg$/)
svgIcons.keys().map(svgIcons)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
