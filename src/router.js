import Vue from 'vue'
import VueRouter from 'vue-router'


import PageNotFound from './components/PageNotFound'
import GameBoard from './Views/GameBoard'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/gameboard',
    },
    {
      path: '/gameboard',
      name: 'gameboard',
      component: GameBoard
    },
    {
      path: '*',
      component: PageNotFound,
    }
  ],
});