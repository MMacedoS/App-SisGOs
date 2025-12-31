<template>
  <div class="text-1xl font-bold mb-5">Dashboard Page</div>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <Card
      @click="redirect('/products')"
      class="cursor-pointer hover:bg-gray-100 transition"
    >
      <CardHeader class="text-blue-600">
        <CardTitle class="text-lg p-3">Produtos</CardTitle>
        <CardDescription>Total Produtos cadastrados</CardDescription>
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/clients')"
      class="cursor-pointer hover:bg-gray-100 transition"
    >
      <CardHeader class="text-amber-600">
        <CardTitle class="text-lg p-3">Clientes</CardTitle>
        <CardDescription>Total Clientes cadastrados</CardDescription>
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/suppliers')"
      class="cursor-pointer hover:bg-gray-100 transition"
    >
      <CardHeader class="text-green-600">
        <CardTitle class="text-lg p-3">Fornecedores</CardTitle>
        <CardDescription>Total Fornecedores cadastrados</CardDescription>
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/service-orders')"
      class="cursor-pointer hover:bg-gray-100 transition"
    >
      <CardHeader class="text-red-600">
        <CardTitle class="text-lg p-3">Ordens de Serviço</CardTitle>
        <CardDescription>Total Ordens de Serviço cadastradas</CardDescription>
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/sales')"
      class="cursor-pointer hover:bg-gray-100 transition"
    >
      <CardHeader class="text-purple-600">
        <CardTitle class="text-lg p-3">Vendas</CardTitle>
        <CardDescription>Total Vendas cadastradas</CardDescription>
      </CardHeader>
    </Card>

    <Card
      @click="redirect('/users')"
      class="cursor-pointer hover:bg-gray-100 transition"
    >
      <CardHeader class="text-teal-600">
        <CardTitle class="text-lg p-3">Usuários</CardTitle>
        <CardDescription>Total Usuários cadastrados</CardDescription>
      </CardHeader>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";

function redirect(path: string) {
  window.location.href = path;
}
</script>

<style lang=""></style>
