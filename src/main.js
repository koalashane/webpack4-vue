import Vue from "vue"
import VueRouter from "vue-router"
import App from "./app.vue"
import routerConfig from "./router"
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);
Vue.use(VueRouter);

const router = new VueRouter(routerConfig)
new Vue({
    el: "#app",
    router: router,
    render: h => h(App)
})