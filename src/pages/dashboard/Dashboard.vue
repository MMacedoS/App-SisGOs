<template>
  <div class="text-1xl font-bold mb-5">Dashboard Page</div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <Card
      @click="redirect('/products')"
      class="cursor-pointer bg-blue-600 hover:bg-blue-500 transition"
    >
      <CardHeader class="text-white">
        <CardTitle class="text-lg p-3 font-mono">Produtos</CardTitle>
        <CardDescription class="text-white p-3 font-serif text-1xl"
          >Total Produtos cadastrados</CardDescription
        >
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/customers')"
      class="cursor-pointer bg-lime-600 hover:bg-lime-500 transition"
    >
      <CardHeader class="text-white">
        <CardTitle class="text-lg p-3 font-mono">Clientes</CardTitle>
        <CardDescription class="text-white p-3 font-serif text-1xl"
          >Total Clientes cadastrados</CardDescription
        >
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/services')"
      class="cursor-pointer bg-amber-600 hover:bg-amber-500 transition"
    >
      <CardHeader class="text-white">
        <CardTitle class="text-lg p-3 font-mono">Serviços</CardTitle>
        <CardDescription class="text-white p-3 font-serif text-1xl"
          >Total Serviços cadastrados</CardDescription
        >
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/service-orders')"
      class="cursor-pointer bg-red-600 hover:bg-red-500 transition"
    >
      <CardHeader class="text-white">
        <CardTitle class="text-lg p-3 font-mono">Ordens de Serviço</CardTitle>
        <CardDescription class="text-white p-3 font-serif text-1xl"
          >Total Ordens de Serviço cadastradas</CardDescription
        >
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/sales')"
      class="cursor-pointer bg-purple-600 hover:bg-purple-500 transition"
    >
      <CardHeader class="text-white">
        <CardTitle class="text-lg p-3 font-mono">Vendas</CardTitle>
        <CardDescription class="text-white p-3 font-serif text-1xl"
          >Total Vendas cadastradas</CardDescription
        >
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/users')"
      class="cursor-pointer bg-teal-600 hover:bg-teal-500 transition"
    >
      <CardHeader class="text-white">
        <CardTitle class="text-lg p-3 font-mono">Usuários</CardTitle>
        <CardDescription class="text-white p-3 font-serif text-1xl"
          >Total Usuários cadastrados</CardDescription
        >
      </CardHeader>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function redirect(path: string) {
  router.push(path);
}
</script>

<style lang=""></style>
