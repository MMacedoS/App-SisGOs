import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import Users from "@/pages/users/Users.vue";
import Product from "@/pages/products/Product.vue";
import Customer from "@/pages/customers/Customer.vue";
import Sale from "@/pages/sales/Sale.vue";
import ServiceOrder from "@/pages/service-orders/ServiceOrder.vue";
import Login from "@/pages/login/Login.vue";
import Register from "@/pages/register/Register.vue";
import Service from "@/pages/services/Service.vue";

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
  {
    path: "/products",
    name: "Products",
    component: Product,
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customer,
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sale,
  },
  {
    path: "/services",
    name: "Services",
    component: Service,
  },
  {
    path: "/service-orders",
    name: "ServiceOrders",
    component: ServiceOrder,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.name !== "Login" && to.name !== "Register";

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  if (to.name === "Login" && authStore.isAuthenticated) {
    return next({ name: "Dashboard" });
  }

  next();
});

export default router;
