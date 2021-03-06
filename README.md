# Vue Routing

- [Vue Routing](#vue-routing)
  - [Deployment](#deployment)
  - [Description](#description)
  - [Add routing](#add-routing)
  - [Implementation](#implementation)
  - [Route Styling](#route-styling)
  - [Programmatic Navigation](#programmatic-navigation)
  - [Passing Data with routes](#passing-data-with-routes)
  - [Consideration](#consideration)
  - [Passing data as prop](#passing-data-as-prop)
  - [Redirect and alias](#redirect-and-alias)
  - [Catch all routes](#catch-all-routes)
  - [Nested Routes](#nested-routes)
  - [Named routes](#named-routes)
  - [Query Params](#query-params)
  - [Named router view](#named-router-view)
  - [Controlling scroll behaviours](#controlling-scroll-behaviours)
  - [Router Guards](#router-guards)
  - [meta](#meta)
  - [Folder structure](#folder-structure)
  - [Hints](#hints)

## Deployment

- Checkout deployment at https://gagandeep39.github.io/vue-routing-demo/

## Description

- Used to navigate across application
- Allows implementing multipage concept

## Add routing

- `npm install --save vue-router@next` / `yarn add vue-router@next`
- **NOTE** `next` is required else , application will add Vue2 router

## Implementation

1. Add routes in main.js
2. Speciffy where the routes must be used using `<router-view></router-view>`
3. Navigation buttons are added using <routerLink to='path'></routerLink>

```js
const router = createRouter({
  history: createWebHistory(), //Ensures user goes to previous page on back press
  routes: [
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
  ],
});
createApp(App)
  .use(router)
  .mount('#app');
```

- `createWebHistory()` Use browsers buildt in history logic on back press

```html
<!-- Location yo set active page -->
<template>
  <the-navigation @set-page="setActivePage"></the-navigation>
  <main>
    <!-- <component :is="activePage"></component> -->
    <router-view></router-view>
  </main>
</template>
```

```html
<!-- Buttons for redirecting routes -->
<template>
  <header>
    <nav>
      <ul>
        <li>
          <!-- <button @click="setActivePage('teams-list')">Teams</button> -->
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <!-- <button @click="setActivePage('users-list')">Users</button> -->
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
```

## Route Styling

- `router-link-active` Class used when a route **and** nested routes are active
- `link-exact-active` Applied when specific route is active (Not when subroutes are active)
- We can add css styling to this
- More CSS classes can be specified at `main.js`

```js
const router = createRouter({
  routes: [{ path: '/teams', component: TeamsList }],
  linkActiveClass: 'class-name', // CSS to be applied
});
createApp(App)
  .use(router)
  .mount('#app');
```

## Programmatic Navigation

- Vue allows us with \$router to carry out routing programmatically

```html
<li>
  <a @click="programmaticNavigation">Programmatic Navigation</a>
</li>
```

```js
methods: {
    programmaticNavigation() {
      this.$router.push('/users')
    },
  },
```

- Other methods include
  - `this.$router.forward()` Go forward after back
  - `this.$router.back()` Go back
  - `this.$router.params` Fetch route params

## Passing Data with routes

- Allows us to specify path variable
- We can pass any string such as `/teams/abc`, `/teams/123`
- Data can be fetched using `this.$router.params`

```js
const router = createRouter({
  routes: [{ path: '/teams/:id', component: TeamMembers }],
});
createApp(App)
  .use(router)
  .mount('#app');
```

## Consideration

- If we call the same route from inside the route and different data, the data will not be updated
- This behaviour can be fixed with `watcher`
- Every time, route is changed $route is changed. Hence we can atch $route

## Passing data as prop

- When we use `this.$route.parms`, the code gets tie to routig
- It wil crash if code is executed without param
- To preent this, we can convert route params to prop, which will make it more usable
- ENable the flag in route configuration `props: true`

```js
const router = createRouter({
  routes: [{ path: '/teams/:id', component: TeamMembers, props: true }],
});
createApp(App)
  .use(router)
  .mount('#app');
```

## Redirect and alias

- Reirect is used to direct a route to another route (Causes route to change)
  - `{ path: '/', redirect: '/teams' },`
- Alias allows us to use different routes for same component
  - `{ path: '/teams', component: TeamsList, alias: '/ }`

## Catch all routes

- `{ path: '/:notFound(.*)', redirect: '/' }`
- Expression allow us to use a component for no matching routes `(.*)` implies all

## Nested Routes

- Creating child level routes
- Add routing inside a component
- Can be adding using an array

```js
const router = createRouter({
  routes: [
    { path: '/', redirect: '/teams' },
    {
      path: '/teams',
      component: TeamsList,
      children: [{ path: ':id', component: TeamMembers, props: true }],
    },
  ],
});
createApp(App)
  .use(router)
  .mount('#app');
```

- To acces this route, we need to add a router-view inside TeamList component

```html
<template>
  <router-view></router-view>
  <!-- Rest of the code -->
</template>
```

## Named routes

- Allows specifying the name of route and the route in which the data should bdisplayed
- Prevents us from updating code everytime name changes

```js
// Creating named route
routes: [
    { path: '/', redirect: '/teams', name: 'teams' },
    {
      path: '/teams',
      component: TeamsList,
      children: [
        {
          path: '/teams/:id',
          component: TeamMembers,
          props: true,
          name: 'team-member',
        },
      ],
    },
  ],
```

```js
// Acessing named route
export default {
  props: ['id', 'name', 'memberCount'],
  computed: {
    teamRouter() {
      // return `/teams/${this.id}`
      // Here we are specifying name of route instead f path
      return { name: 'team-member', params: { id: this.id } };
    },
  },
};
```

## Query Params

- Optional route parameter
- Used in searches normally
- Added by appending query: {} to the router object
- Not defined in router config
- Fetched using `this.$route.query`

```js
export default {
  computed: {
    teamRouter() {
      return {
        name: 'team-member',
        params: { id: this.id },
        query: { sort: 'asc' },
      };
    },
  },
};
```

## Named router view

- Allows having multiple router views at same level
- Load multiple component at same level
- Doing this require us to specify which view to use, else the data will be rendered twice
- We need to create multiple router-view and pass multiple components while routing

```js
// Pass multiple component
{
      path: '/teams',
      // component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
    },
```

```html
<!-- Render multiple router viewx -->
<main>
  <router-view></router-view>
</main>
<footer>
  <router-view name="footer"></router-view>
</footer>
```

## Controlling scroll behaviours

- Allows automatically scroling as soon as we route to different page
- Can be done by writing `scrollBehaviour()` method in router config
- Improves UX

```js
const router = createRouter({
  // createWebHistory() Use browsers buildt in history logic
  history: createWebHistory(), //Ensures user goes to previous page on back press
  routes: [
    { path: '/', redirect: '/teams', name: 'teams' },
    { path: '/users', component: UsersList },
    {
      path: '/:notFound(.*)',
      component: NotFound,
      beforeEnter: (to, from, next) => {
        console.log('Router level');
      },
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    // Scroll to previous position whn user clicks n bac
    // Saved position is not null on backpress
    if (savedPosition) return savedPosition;
    // Scroll to top when user clicks on a link
    return { left: 0, top: 0 };
  },
});
```

## Router Guards

- Useful for authentication, prevent user from leaving edit screen
- Method automatically called when a route is called

```js
// Before each is executd before every route
router.beforeEach((to, from, next) => {
  // next(false) - Cancel routing
  // next('/teams') - Redirect to 'teams' route
  next(); // - Continue navigation
});
```

- Can be added at root level i.e outside ruter or inside nested roues also
- Order is - Global -> Router level -> Component level
- Component level implies beforeEach((to, from, next) => {}) insie a comonent as a lifcycle hook
- `beforeRouteLeave` Shows a prompt if we try to navigate outside, it is aded at component level

```js
beforeRouteLeave(to, from, next) {
    // Can be used to validate if chnges are saved
    console.log('Before route leave');
    if (confirm('Are you sure you want to leave')) next();
  },
```

## meta

- Allows storing variables in router confi
  - eg. `meta: {needsAuth: true}`
- These variables can later be used in logicl operation

## Folder structure

- We can use `pages` directoy to store components that are loaded using routing
- Non routing related components can be stored in `components`
- All routing code can be stored in `router.js`

## Hints

- Vue gives error if we do not use a variable
- Sometimes inbuild methods provides us with var we dont need
- Error can be fixed by replacing parameter names as `_`, `_2`...
