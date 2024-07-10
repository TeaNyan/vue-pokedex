<script setup>
import logo from '@/assets/logo/logo.png'
</script>

<template>
  <header>
    <div
      class="wrapper w-100 bg-red-600 h-[65px] w-full fixed top-0 items-center flex justify-center"
    >
      <div class="max-w-[1750px] w-full items-center flex justify-start">
        <img class="h-12 w-auto" :src="logo" />
        <h1 class="text-white text-2xl font-bold">Pokedex</h1>
      </div>
    </div>
  </header>
</template>
