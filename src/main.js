import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList';
import UsersList from './components/users/UsersList';

const router = createRouter({
  // createWebHistory() Use browsers buildt in history logic
  history: createWebHistory(), //Ensures user goes to previous page on back press
  routes: [
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
  ],
});
createApp(App)
  .use(router)
  .mount('#app');
