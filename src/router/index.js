// import vue and vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

// import components
import Nav from '../components/Nav';
import Login from '../components/Login';
import Map from '../components/Map';
import CameraLive from "@/components/CameraLive";
import CameraDetail from "@/components/CameraDetail";

export default new VueRouter({
    routes: [
        { path:'/',redirect:'/nav' },
        { path:'/nav',component: Nav },
        { path:'/login',component:Login },
        { path:'/map',component:Map },
        { path:'/live',component:CameraLive },
        { path:'/detail',component:CameraDetail }
    ]
})