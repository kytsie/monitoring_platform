import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router/index.js'

import Axios from "axios"
import Qs from 'qs';
Vue.prototype.$qs = Qs;
Vue.prototype.$axios = Axios.create({
  baseURL:'http://localhost:8089',
  timeout:1000*5,
  headers:{
    'Content-Type':'application/x-www-form-urlencoded'
  },
  withCredentials:true
});
Vue.prototype.qs = Qs;

import Vant from 'vant'
Vue.use(Vant);
import 'vant/lib/index.css'

import VueVideoPlayer from "vue-video-player/src";
import 'video.js/dist/video-js.css';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VueVideoPlayer);

Vue.config.productionTip = false;

new Vue({
  el:'#app',
  router,
  render:h=>h(App)
});
