<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
    v-show="isLoading"
  >
    <div
      class="flex items-center space-x-4 border rounded-xl p-4"
      v-for="index in 8"
      :key="index"
    >
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2 flex-1">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-3/4" />
      </div>
    </div>
  </div>

  <Card class="w-full h-full m-0 p-4 mb-15 lg:mb-20" v-if="!isLoading">
    <CardDescription
      class="text-xl font-bold mb-5 flex gap-2 justify-between items-center"
    >
      <div>
        <h2 class="text-2xl font-bold">Produtos</h2>
        <p class="text-sm text-muted-foreground font-normal mt-1">
          {{ totalItems }}
          {{ totalItems === 1 ? "produto cadastrado" : "produtos cadastrados" }}
        </p>
      </div>
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button
            class="bg-blue-600 hover:bg-blue-500 text-white"
            size="sm"
            @click="openCreateDialog"
          >
            <CirclePlus class="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{
              editingProduct ? "Editar Produto" : "Novo Produto"
            }}</DialogTitle>
            <DialogDescription>
              {{
                editingProduct
                  ? "Atualize os dados do produto"
                  : "Preencha os dados do produto abaixo"
              }}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            :initial-data="editingProduct"
            @submit="handleProductSubmit"
            @cancel="closeDialog"
          />
        </DialogContent>
      </Dialog>
    </CardDescription>

    <Separator class="mb-6" />

    <CardContent class="p-0">
      <div v-if="products.length === 0" class="text-center py-12">
        <div
          class="mx-auto w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center"
        >
          <CirclePlus class="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 class="text-lg font-semibold mb-2">Nenhum produto cadastrado</h3>
        <p class="text-sm text-muted-foreground mb-4">
          Comece adicionando seu primeiro produto
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div
          class="border rounded-xl p-4 hover:shadow-lg transition-shadow duration-200"
          v-for="product in products"
          :key="product.id"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold text-lg">
                  {{ product.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-base truncate"
                  :title="product.name"
                >
                  {{ product.name }}
                </h3>
                <p class="text-xs text-muted-foreground">
                  ID: {{ product.code }}
                </p>
              </div>
            </div>
            <div class="shrink-0 ml-2">
              <span
                class="relative flex h-3 w-3"
                :title="product.stock > 0 ? 'Em estoque' : 'Sem estoque'"
              >
                <span
                  class="absolute inline-flex h-full w-full rounded-full opacity-75"
                  :class="
                    product.stock > 0
                      ? 'animate-ping bg-green-400'
                      : 'bg-red-400'
                  "
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3"
                  :class="product.stock > 0 ? 'bg-green-500' : 'bg-red-500'"
                ></span>
              </span>
            </div>
          </div>

          <Separator class="my-3" />

          <div class="space-y-2 mb-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Preço:</span>
              <span class="font-semibold text-green-600">
                R$ {{ product.price.toFixed(2) }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Estoque:</span>
              <span
                class="font-semibold"
                :class="product.stock > 0 ? 'text-blue-600' : 'text-red-600'"
              >
                {{ product.stock }}
                {{ product.stock === 1 ? "unidade" : "unidades" }}
              </span>
            </div>
          </div>

          <div class="flex gap-2 mt-4">
            <Button
              variant="outline"
              class="flex-1 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300"
              size="sm"
              @click="openEditDialog(product)"
            >
              <Edit2 class="mr-1 h-3 w-3" />
              Editar
            </Button>
            <Delete @confirm="handleDeleteProduct(product.id)" />
          </div>
        </div>
      </div>

      <div v-if="products.length > 0">
        <Separator class="my-6" />
        <Pagination
          :total="totalItems"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @update:current-page="handlePageChange"
        />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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
import { CirclePlus, Edit2 } from "lucide-vue-next";
import { useProducts } from "@/composables/products/useProducts";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import Separator from "@/components/ui/separator/Separator.vue";
import Pagination from "@/shared/Pagination.vue";
import Button from "@/components/ui/button/Button.vue";
import Delete from "@/shared/Delete.vue";

const { fetchProducts, postProducts, putProducts, deleteProducts } =
  useProducts();
const products = ref<Product[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const isDialogOpen = ref(false);
const editingProduct = ref<Product | null>(null);

const loadProducts = async () => {
  isLoading.value = true;
  try {
    const result = await fetchProducts(currentPage.value, itemsPerPage.value);
    products.value = result.data;
    totalItems.value = result.total;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadProducts();
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadProducts();
};

const handleProductSubmit = async (data: any) => {
  try {
    if (editingProduct.value) {
      const result = await putProducts(editingProduct.value.id, data);
      console.log("Produto atualizado:", result);
      closeDialog();
      loadProducts();
      return;
    }

    const result = await postProducts(data);
    console.log("Produto criado:", result);
    closeDialog();
    loadProducts();
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
  }
};

const handleDeleteProduct = async (id: string) => {
  try {
    await deleteProducts(id);
    console.log("Produto deletado:", id);
    loadProducts();
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
  }
};

const openCreateDialog = () => {
  editingProduct.value = null;
  isDialogOpen.value = true;
};

const openEditDialog = (product: Product) => {
  editingProduct.value = { ...product };
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  editingProduct.value = null;
};
</script>
<style lang=""></style>
