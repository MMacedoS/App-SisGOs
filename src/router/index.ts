import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import Users from "@/pages/users/Users.vue";
import Product from "@/pages/products/Product.vue";
import Customer from "@/pages/customers/Customer.vue";
import Sale from "@/pages/sales/Sale.vue";
import ServiceOrder from "@/pages/service-orders/ServiceOrder.vue";
import Login from "@/pages/login/Login.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/products",
    name: "Products",
    component: Product,
    meta: { requiresAuth: true },
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customer,
    meta: { requiresAuth: true },
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sale,
    meta: { requiresAuth: true },
  },
  {
    path: "/service-orders",
    name: "ServiceOrders",
    component: ServiceOrder,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login" });
  } else if (to.name === "Login" && authStore.isAuthenticated) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
