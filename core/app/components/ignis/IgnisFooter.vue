<template>
  <footer>
    <NuxtLink to="https://nuxt-ignis.com/" class="ignis-link">
      https://nuxt-ignis.com/
    </NuxtLink>
  </footer>
</template>

<style scoped lang="css">
footer {
  text-align: center;
  margin: 0.25rem 0; /* 4px */
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
}

/* text-xs hover:text-amber-300 */
.ignis-link {
  font-size: 0.75rem;
}
.ignis-link:hover {
  color: oklch(87.9% 0.169 91.605);
}
</style>
