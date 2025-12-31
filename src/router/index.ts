import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import Users from "@/pages/users/Users.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
