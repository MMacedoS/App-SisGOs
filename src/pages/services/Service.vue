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
        <h2 class="text-2xl font-bold">Serviços</h2>
        <p class="text-sm text-muted-foreground font-normal mt-1">
          {{ totalItems }}
          {{ totalItems === 1 ? "serviço cadastrado" : "serviços cadastrados" }}
        </p>
      </div>
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button
            class="bg-amber-600 hover:bg-amber-500 text-white"
            size="sm"
            @click="openCreateDialog"
          >
            <CirclePlus class="mr-2 h-4 w-4" />
            Novo Serviço
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{
              editingService ? "Editar Serviço" : "Novo Serviço"
            }}</DialogTitle>
            <DialogDescription>
              {{
                editingService
                  ? "Atualize os dados do serviço"
                  : "Preencha os dados do serviço abaixo"
              }}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            :initialData="editingService"
            @submit="handleServiceSubmit"
            @cancel="closeDialog"
          />
        </DialogContent>
      </Dialog>
    </CardDescription>
    <Separator class="my-4" />

    <CardContent class="p-0">
      <div v-if="services.length === 0" class="text-center py-12">
        <div
          class="mx-auto w-24 h-24 mb-4 rounded-full bg-muted flex items-center justify-center"
        >
          <CirclePlus class="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 class="text-lg font-semibold mb-2">Nenhum serviço cadastrado</h3>
        <p class="text-sm text-muted-foreground mb-6">
          Comece cadastrando um novo serviço para gerenciar suas ofertas.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        v-else
      >
        <div
          class="border rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
          v-for="service in services"
          :key="service.id"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white font-bold text-lg">
                  {{ service.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-base truncate"
                  :title="service.name"
                >
                  {{ service.name }}
                </h3>
                <p class="text-xs text-muted-foreground">
                  ID: {{ service.code }}
                </p>
              </div>
            </div>
            <div class="shrink-0 ml-2">
              <span
                class="relative flex h-3 w-3"
                :title="service.status ? 'Ativo' : 'Inativo'"
              >
                <span
                  class="absolute inline-flex h-full w-full rounded-full opacity-75"
                  :class="
                    service.status ? 'animate-ping bg-green-400' : 'bg-red-400'
                  "
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3"
                  :class="service.status ? 'bg-green-500' : 'bg-red-500'"
                ></span>
              </span>
            </div>
          </div>
          <Separator class="my-3" />

          <div class="space-y-2 mb-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Preço:</span>
              <span class="font-semibold text-green-600">
                R$ {{ service.value.toFixed(2) }}
              </span>
            </div>
          </div>

          <div class="flex gap-2 mt-4">
            <Button
              variant="outline"
              class="flex-1 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300"
              size="sm"
              @click="openEditDialog(service)"
            >
              <Edit2 class="mr-1 h-3 w-3" />
              Editar
            </Button>
            <Delete @confirm="handleDeleteService(service.id)" />
          </div>
        </div>
      </div>
      <div v-if="services.length > 0">
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
import Separator from "@/components/ui/separator/Separator.vue";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import { useServices } from "@/composables/services/useServices";
import Delete from "@/shared/Delete.vue";
import type { Service } from "@/types/service";
import { CirclePlus } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import ServiceForm from "./ServiceForm.vue";

const isLoading = ref(false);
const totalItems = ref(0);
const isDialogOpen = ref(false);
const editingService = ref<Service | null>(null);
const services = ref<Service[]>([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const { fetchServices, deleteServices, postServices, putServices } =
  useServices();

const loadServices = async (attr: string) => {
  isLoading.value = true;
  try {
    const result = await fetchServices(attr, currentPage.value, itemsPerPage);
    services.value = result.data;
    totalItems.value = result.total;
  } finally {
    isLoading.value = false;
  }
};

const openCreateDialog = () => {
  editingService.value = null;
  isDialogOpen.value = true;
};

onMounted(() => {
  loadServices("");
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadServices("");
};

const openEditDialog = (service: Service) => {
  editingService.value = { ...service };
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  editingService.value = null;
};

const handleDeleteService = async (id: string) => {
  try {
    await deleteServices(id);
    console.log("Serviço deletado:", id);
    loadServices("");
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
  }
};

const handleServiceSubmit = async (data: any) => {
  try {
    if (editingService.value) {
      const result = await putServices(editingService.value.id, data);
      console.log("Serviço atualizado:", result);
      closeDialog();
      loadServices("");
      return;
    }

    const result = await postServices(data);
    console.log("Serviço criado:", result);
    closeDialog();
    loadServices("");
  } catch (error) {
    console.error("Erro ao salvar serviço:", error);
  }
};
</script>
<style lang=""></style>
