<script setup lang="ts">
import { computed } from "vue";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useAuth } from "./composables/useAuth";
import Footer from "./components/footer/footer.vue";

const { isAuthenticated } = useAuth();

const layout = computed(() => {
  if (!isAuthenticated.value) {
    return AuthLayout;
  }

  return AuthenticatedLayout;
});
</script>

<template>
  <component :is="layout" />
  <Footer />
</template>
