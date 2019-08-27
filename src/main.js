// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('./bootstrap')

import Vue from 'vue'
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
window.eventBus = new Vue();
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
