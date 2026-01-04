<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nome do Produto</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Digite o nome do produto"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Descrição</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Digite a descrição"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="price">
      <FormItem>
        <FormLabel>Preço</FormLabel>
        <FormControl>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="stock">
      <FormItem>
        <FormLabel>Estoque</FormLabel>
        <FormControl>
          <Input
            type="number"
            step="1"
            placeholder="0 unidades"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="status">
      <FormItem>
        <FormLabel>Status</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-end gap-2">
      <Button type="button" variant="outline" @click="$emit('cancel')">
        Cancelar
      </Button>
      <Button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white">
        Salvar
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { watch } from "vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import Select from "@/components/ui/select/Select.vue";
import type { Product } from "@/types/product";

const props = defineProps<{
  initialData?: Product | null;
}>();

const emit = defineEmits<{
  submit: [
    data: {
      name: string;
      description?: string;
      price: number;
      stock: number;
      status: "ativo" | "inativo";
    }
  ];
  cancel: [];
}>();

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: "Nome é obrigatório" })
      .min(3, "Nome deve ter no mínimo 3 caracteres"),
    description: z.string().optional(),
    price: z.coerce
      .number({ required_error: "Preço é obrigatório" })
      .min(0.01, "Preço deve ser maior que zero"),
    stock: z.coerce
      .number({ required_error: "Estoque é obrigatório" })
      .min(0, "Estoque não pode ser negativo"),
    status: z.enum(["ativo", "inativo"], {
      required_error: "Status é obrigatório",
    }),
  })
);

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: formSchema,
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      setValues({
        name: newData.name,
        description: newData.description || "",
        price: newData.price,
        stock: newData.stock,
        status: newData.status || "ativo",
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
  resetForm();
});
</script>
