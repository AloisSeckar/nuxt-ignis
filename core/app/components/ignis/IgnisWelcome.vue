<template>
  <div class="ignis-welcome">
    <h1 class="ignis-welcome-header">
      Welcome to Ignis
    </h1>
    <p>Thank you for choosing Nuxt Ignis! Your awesome website is just a few steps away.</p>
    <p v-if="pages">
      Replace <span class="file">/pages/index.vue</span> with your own content to get started. You may also replace <span class="file">/app.vue</span> to adjust site defaults.
    </p>
    <p v-else>
      Replace <span class="file">/app.vue</span> with your own content to get started.
    </p>
    <h2 class="ignis-welcome-subheader">
      Resources
    </h2>
    <div class="ignis-welcome-resources">
      <NuxtLink to="/_ignis-info" class="feature">Features Overview</NuxtLink>
      <NuxtLink to="/_ignis-config" class="feature">Configuration Overview</NuxtLink>
      <NuxtLink to="https://nuxt-ignis.netlify.app/" class="feature">Documentation &#x1F517;</NuxtLink>
    </div>
    <a href="https://github.com/AloisSeckar/nuxt-ignis" title="Nuxt Ignis on GitHub">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="#888888" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" /></svg>
    </a>
  </div>
</template>

<script setup lang="ts">
const pages = useRuntimeConfig().public.ignis.pages
</script>

<style scoped lang="css">
.ignis-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
}

.ignis-welcome-header {
  text-align: center;
  font-family: monospace;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #fbbf24;
}

.ignis-welcome-subheader {
  text-align: center;
  font-family: monospace;
  font-size: 1.5rem;
  color: #fbbf24;
}

.ignis-welcome-resources {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

p {
  width: 100%;
}

.file {
  display: inline;
  color: #fbbf24;
  font-family: monospace;
}

/* TODO unify with IgnisFeature.vue */
.feature {
  margin: 4px;
  padding: 4px 12px;
  border: 2px solid #fcd34d;
  font-size: 1em !important;
  font-weight: bold;
  background-color: #047857;
  color: #f1f5f9;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-radius: 0.5rem;
}
.feature:hover {
  background-color: #334155;
  color: #3CB371;
  text-decoration: none;
}
</style>
