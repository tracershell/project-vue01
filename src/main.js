import 'core-js/stable';  // 최신 JavaScript 기능을 구형 브라우저에서도 사용할 수 있도록 함
import 'regenerator-runtime/runtime';  // async/await 등의 기능을 지원

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import vuetify from './plugins/vuetify'
import { sync } from "vuex-router-sync";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

export function createApp(ctx)  {
  const router = createRouter();
  const store = createStore();
  sync(store, router);

  const app = new Vue({
    data : {url : ctx ? ctx.url : '' },
    router,
    store,
    vuetify,
    render: h => h(App)
  });

  return {app : app, router : router, store : store}
};

  
