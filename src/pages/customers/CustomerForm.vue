<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nome</FormLabel>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
            placeholder="Digite o nome do cliente"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>E-mail</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="Digite o e-mail do cliente"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="type_doc">
        <FormItem>
          <FormLabel>Tipo de Documento</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="cnpj">CNPJ</SelectItem>
                <SelectItem value="rg">RG</SelectItem>
                <SelectItem value="passport">Passaporte</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="doc">
        <FormItem>
          <FormLabel>Documento</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Digite o número do documento"
              v-bind="componentField"
              @input="handleDocInput"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Digite o telefone do cliente"
              v-bind="componentField"
              @input="handlePhoneInput"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="birth_date">
        <FormItem>
          <FormLabel>Data de Nascimento</FormLabel>
          <FormControl>
            <Input
              type="date"
              placeholder="Selecione a data de nascimento"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="address">
        <FormItem>
          <FormLabel>Endereço</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Digite o endereço"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="city">
        <FormItem>
          <FormLabel>Cidade</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Digite a cidade"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <FormField v-slot="{ componentField }" name="state">
        <FormItem>
          <FormLabel>Estado</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Digite o estado"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="zip_code">
        <FormItem>
          <FormLabel>CEP</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Digite o CEP"
              @input="handleCepInput"
              v-bind="componentField"
            />
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
import type { Customer, CustomerRequest } from "@/types/customer";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { watch } from "vue";
import * as z from "zod";
import {
  validateDocument,
  formatDocument,
  validatePhone,
  formatPhone,
  validateCEP,
  formatCEP,
} from "@/lib/validated";

const props = defineProps<{
  initialData?: Customer | null;
}>();

const emit = defineEmits<{
  submit: [data: CustomerRequest];
  cancel: [];
}>();

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1, "O nome é obrigatório"),
      email: z.string().email("E-mail inválido").optional(),
      phone: z
        .string()
        .optional()
        .refine((val) => !val || validatePhone(val), "Telefone inválido"),
      type_doc: z.enum(["cpf", "cnpj", "rg", "passport"], {
        errorMap: () => ({ message: "O tipo de documento é obrigatório" }),
      }),
      doc: z.string().min(1, "O documento é obrigatório"),
      birth_date: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip_code: z
        .string()
        .optional()
        .refine((val) => !val || validateCEP(val), "CEP inválido"),
      country: z.string().optional(),
      status: z.enum(["ativo", "inativo"], {
        errorMap: () => ({ message: "O status é obrigatório" }),
      }),
    })
    .refine(
      (data) => {
        if (data.type_doc === "cpf" || data.type_doc === "cnpj") {
          return validateDocument(data.type_doc, data.doc);
        }
        return true;
      },
      {
        message: "Documento inválido",
        path: ["doc"],
      }
    )
);

const { handleSubmit, resetForm, setValues, values, setFieldValue } =
  useForm<CustomerRequest>({
    validationSchema: formSchema,
  });

const handleDocInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const typeDoc = values.type_doc;

  if (typeDoc === "cpf" || typeDoc === "cnpj") {
    const formatted = formatDocument(typeDoc, input.value);
    setFieldValue("doc", formatted);
  }
};

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formatted = formatPhone(input.value);
  setFieldValue("phone", formatted);
};

const handleCepInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formatted = formatCEP(input.value);
  setFieldValue("zip_code", formatted);
};

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      setValues({
        name: newData.person.name,
        email: newData.person.email || "",
        phone: newData.person.phone || "",
        type_doc: newData.person.type_doc,
        doc: newData.person.doc,
        birth_date: newData.person.birth_date || "",
        address: newData.person.address || "",
        city: newData.person.city || "",
        state: newData.person.state || "",
        zip_code: newData.person.zip_code || "",
        country: newData.person.country || "",
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
