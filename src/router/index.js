import { createRouter, createWebHistory } from 'vue-router';

function loadPage(view) {
  return () =>
    import(
     `@/views/${view}.vue`
    );
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: loadPage('Dashboard'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadPage('Profile'),
  },
  {
    path: '/site-info',
    name: 'SiteInfo',
    component: loadPage('SiteInfo'),
  },
  {
    path: '/products',
    name: 'Products',
    component: loadPage('Products'),
  },
  {
    path: '/products/:id',
    name: 'EditProduct',
    component: loadPage('EditProduct'),
    props: true,
  },
  {
    path: '/create-product',
    name: 'CreateProduct',
    component: loadPage('CreateProduct'),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: loadPage('Categories'),
  },
  {
    path: '/categories/:id',
    name: 'EditCategory',
    component: loadPage('EditCategory'),
    props: true,
  },
  {
    path: '/create-category',
    name: 'CreateCategory',
    component: loadPage('CreateCategory'),
  },
  {
    path: '/services',
    name: 'Services',
    component: loadPage('Services'),
  },
  {
    path: '/services/:id',
    name: 'EditService',
    component: loadPage('EditService'),
    props: true,
  },
  {
    path: '/create-service',
    name: 'CreateService',
    component: loadPage('CreateService'),
  },
  /*{
    path: '/sign-up',
    name: 'SignUp',
    component: loadPage('SignUp')
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: loadPage('SignIn')
  },*/
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/*router.beforeEach((to, from, next) => {
  const currentUser = supabase.auth.user();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('sign-in');
  else if (!requiresAuth && currentUser) next('/');
  else next();
});*/

export default router;
