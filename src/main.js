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
    {
      path: '/users',
      component: UsersList,
      beforeEnter: (to, from, next) => {
        console.log('Router level gyuard');
        next();
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    // Scroll to previous position whn user clicks n bac
    // Saved position is not null on backpress
    if (savedPosition) return savedPosition;
    // Scroll to top when user clicks on a link
    return { left: 0, top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  // Excuted before each route
  // to and from are both route objects. must call `next`.
  console.log('Global before each');
  // console.log(to, from);
  // next(false)
  // next('/teams')
  next();
});
createApp(App)
  .use(router)
  .mount('#app');
