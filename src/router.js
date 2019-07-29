import Vue from 'vue';
import Router from 'vue-router';
import Starships from './views/Starships.vue';
import Starship from './views/Starship.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'starships',
      component: Starships,
    },
    {
      path: '/starship/:id',
      name: 'starship',
      component: Starship,
    },
  ],
});
