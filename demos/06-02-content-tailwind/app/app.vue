<template>
  <div>
    <h1 class="text-red-500">
      Nuxt Ignis demo - Nuxt Content + Tailwind
    </h1>
    <hr>
    <div>
      <NuxtPage />
    </div>
    <div>
      <NuxtLink
        to="/first"
        :external="true">
        First
      </NuxtLink>
      &bull;
      <NuxtLink
        to="/second"
        :external="true">
        Second
      </NuxtLink>
    </div>
    <hr>
  </div>
</template>
