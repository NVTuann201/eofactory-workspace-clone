// Composables
import { createRouter, createWebHistory } from 'vue-router'

import store from "@/store";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: ()=> import('@/components/LoginForm.vue'),
  },
  {
    path: '/',
    redirect: { path: "/login" },
    meta: { requiresAuth: true },
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/workspace',
        name: 'Workspace',
        meta: { requiresAuth: true, user: undefined },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: ()=> import('@/components/Workspace.vue'),
      },
      {
        path: '/ws',
        name: 'WorkspaceV2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/components/ws-v2.vue'),
      },
      {
        path: '/user-dashboard',
        name: 'UserDashboard',
        component: () => import('@/components/UserDashboard.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    const isAuthenticated = await store.dispatch("checkAuth");
    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router
