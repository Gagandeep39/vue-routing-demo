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
