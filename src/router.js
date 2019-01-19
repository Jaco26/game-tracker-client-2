import Vue from 'vue'
import VueRouter from 'vue-router'


import PageNotFound from './Views/PageNotFound'
import GameBoard from './Views/GameBoard'
import Players from './Views/Players'

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
      path: '/players',
      name: 'players',
      component: Players,
    },
    {
      path: '*',
      component: PageNotFound,
    }
  ],
});