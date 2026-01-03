<script setup lang="ts">
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
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center">
              <Label for="password">Senha</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Esqueceu sua senha ?
              </a>
            </div>
            <Input id="password" type="password" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col gap-2">
      <Button class="w-full"> Login </Button>
    </CardFooter>
  </Card>
</template>
