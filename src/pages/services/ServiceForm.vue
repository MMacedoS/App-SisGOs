<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nome do Serviço</FormLabel>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
            placeholder="Digite o nome do serviço"
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

    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="duration">
        <FormItem>
          <FormLabel>Duração do Serviço (em horas)</FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0"
              placeholder="0"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="category">
        <FormItem>
          <FormLabel>Categoria</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rede">Rede</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="value">
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
    </div>

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
import Button from "@/components/ui/button/Button.vue";
import { FormField } from "@/components/ui/form";
import FormControl from "@/components/ui/form/FormControl.vue";
import FormItem from "@/components/ui/form/FormItem.vue";
import FormLabel from "@/components/ui/form/FormLabel.vue";
import FormMessage from "@/components/ui/form/FormMessage.vue";
import Input from "@/components/ui/input/Input.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import type { Service, ServiceRequest } from "@/types/service";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { watch } from "vue";
import * as z from "zod";

const props = defineProps<{
  initialData?: Service | null;
}>();

const emit = defineEmits<{
  submit: [data: ServiceRequest];
  cancel: [];
}>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().optional(),
    duration: z
      .number({ invalid_type_error: "A duração deve ser um número" })
      .min(0, "A duração deve ser maior ou igual a zero"),
    category: z.enum(["rede", "hardware", "software", "manutencao", "outros"], {
      errorMap: () => ({ message: "A categoria é obrigatória" }),
    }),
    value: z
      .number({ invalid_type_error: "O valor deve ser um número" })
      .min(0, "O valor deve ser maior ou igual a zero"),
    status: z.enum(["ativo", "inativo"], {
      errorMap: () => ({ message: "O status é obrigatório" }),
    }),
  })
);

const { handleSubmit, resetForm, setValues } = useForm<ServiceRequest>({
  validationSchema: formSchema,
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      setValues({
        name: newData.name,
        description: newData.description || "",
        value: newData.value,
        status: newData.status,
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
<style lang=""></style>
