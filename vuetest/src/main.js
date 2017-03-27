// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
//可以直接写component路径是因为webpeck里有配置,识别cconponents字段后就会自动找到该路径
import goods from 'components/goods/goods.vue' 
import ratings from 'components/ratings/ratings.vue' 
import seller from 'components/seller/seller.vue' 

import './common/stylus/index.styl'
//注册组件
Vue.use(VueRouter);
Vue.use(VueResource);

//注册路由
const routes = [
{	path: '/goods',component: goods},
{	path: '/ratings', component: ratings},
{	path: '/seller', component: seller}
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'Active'
});

const app = new Vue({
  el: '#app',
  router,
  ...App,
});

