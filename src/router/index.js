import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Note from '../views/Note.vue'

Vue.use(VueRouter)

const routes = [
  // Главная. Со списком заметок
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Экран заметки. Ид передается в параметры компонента Note
  {
    path: '/note/:id?',
    name: 'Note',
    component: Note,
    props: true
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
