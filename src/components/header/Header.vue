<script setup lang="ts">
import SidebarMenu from "../layout/sideBar/SidebarMenu.vue";
import SidebarProvider from "../ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "../ui/sidebar/SidebarTrigger.vue";
import SidebarInset from "../ui/sidebar/SidebarInset.vue";
</script>
<template>
  <SidebarProvider>
    <SidebarMenu />
    <SidebarInset>
      <header
        class="gap-2 flex items-center border-b px-4 py-4 text-4xl font-bold fixed top-0 bg-white w-full z-10"
      >
        <SidebarTrigger />
        <div class="grid">
          <h1 class="text-4xl">SisGOs</h1>
          <p class="text-sm font-semibold text-gray-500">
            Sistema de Gestão de Ordem de Serviços
          </p>
        </div>
      </header>
      <main class="p-4 mt-24">
        <router-view />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
