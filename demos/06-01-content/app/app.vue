<template>
  <div>
    <h1>nuxt-content demo</h1>
    <hr>
    <div>
      <NuxtPage />
    </div>
    <div>
      <NuxtLink to="/first" :external="true">First</NuxtLink>
      &bull;
      <NuxtLink to="/second" :external="true">Second</NuxtLink>
    </div>
    <hr>
  </div>
</template>
