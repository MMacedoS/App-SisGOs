<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  const result = await login(email.value, password.value);

  isLoading.value = false;

  if (result.success) {
    router.push("/");
    return;
  }

  errorMessage.value = result.error || "Erro ao fazer login";
};
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Login na sua conta</CardTitle>
      <CardDescription>
        Digite seu email abaixo para entrar na sua conta
      </CardDescription>
      <CardAction>
        <Button variant="link" @click="$emit('register')"> Cadastre-se </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleLogin">
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center">
              <Label for="password">Senha</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Esqueceu sua senha ?
              </a>
            </div>
            <Input id="password" v-model="password" type="password" required />
          </div>
          <p v-if="errorMessage" class="text-sm text-red-600">
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col gap-2">
      <Button class="w-full" @click="handleLogin" :disabled="isLoading">
        {{ isLoading ? "Entrando..." : "Login" }}
      </Button>
    </CardFooter>
  </Card>
</template>
