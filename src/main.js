import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList';
import UsersList from './components/users/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from './components/nav/NotFound';
import TeamsFooter from './components/teams/TeamsFooter';

const router = createRouter({
  // createWebHistory() Use browsers buildt in history logic
  history: createWebHistory(), //Ensures user goes to previous page on back press
  routes: [
    { path: '/', redirect: '/teams', name: 'teams' },
    {
      path: '/teams',
      // component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          path: '/teams/:id',
          component: TeamMembers,
          props: true,
          name: 'team-member',
        },
      ],
    },
    { path: '/users', component: UsersList },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
});
createApp(App)
  .use(router)
  .mount('#app');
