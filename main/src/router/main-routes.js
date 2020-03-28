export default [
  // - Dashboard
  {
    name: 'overview',
    path: '',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'overview' */ '../views/index')
  },
  {
    name: 'bar',
    path: 'bar',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'bar' */ '../views/bar')
  },
  {
    name: 'pie',
    path: 'pie',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'pie' */ '../views/pie')
  },
  {
    name: 'history-graph',
    path: 'history/graph',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'history' */ '../views/history/graph')
  },
  {
    name: 'history-bar',
    path: 'history/bar',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'history' */ '../views/history/bar')
  },
  {
    name: 'history-pie',
    path: 'history/pie',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'history' */ '../views/history/pie')
  },
  {
    name: 'about',
    path: 'about',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'about' */ '../views/about')
  },
  {
    name: 'profile',
    path: 'profile',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'users' */ '../views/profile')
  },
  // - Posts
  {
    name: 'posts',
    path: 'posts/:type',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'posts' */ '../views/posts')
  },
  {
    name: 'edit',
    path: 'edit/:type/:slug?',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'posts' */ '../views/edit')
  },

  // - Terms
  {
    name: 'terms',
    path: 'terms/:type',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'terms' */ '../views/terms')
  },
  // - Users
  {
    name: 'users',
    path: 'users/:page?',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'users' */ '../views/users')
  },
  {
    name: 'roles',
    path: 'roles',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'users' */ '../views/roles')
  },
  {
    name: 'permissions',
    path: 'permissions',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'users' */ '../views/permissions')
  },
  // - Comments
  {
    name: 'comments',
    path: 'comments',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'comments' */ '../views/comments')
  },
  // - Options
  {
    name: 'options',
    path: 'options/:type',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: 'options' */ '../views/options')
  }
]

// // - Default
// {
//   name: 'default',
//   path: '',
//   meta: { requiresAuth: true },
//   redirect: { name: 'dashboard' }
// },
