<template>
  <Card class="w-full h-full m-0 p-4">
    <CardDescription
      class="text-1xl font-bold mb-5 flex gap-2 justify-between mr-2"
    >
      Produtos
      <Dialog>
        <DialogTrigger as-child>
          <Button
            variant="outline"
            class="btn hover:bg-blue-400 hover:text-white"
            size="sm"
          >
            <CirclePlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha os dados do produto abaixo
            </DialogDescription>
          </DialogHeader>
          <ProductForm @submit="handleProductSubmit" @cancel="closeDialog" />
        </DialogContent>
      </Dialog>
    </CardDescription>
    <CardContent>
      <div>Product Page</div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import ProductForm from "./ProductForm.vue";
import { CirclePlus } from "lucide-vue-next";

const handleProductSubmit = (data: any) => {
  console.log("Produto criado:", data);
};

const closeDialog = () => {};
</script>
<style lang=""></style>
