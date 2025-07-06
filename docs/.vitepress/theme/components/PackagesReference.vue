<template>
  <div style="margin: 1rem 0; padding: 0.5rem; font-family: Consolas, monospace; border-radius: 0.25rem; color: white;"
  :style="isDark ? { backgroundColor: '#2f2f2f', color: '#f8fafc' } : { backgroundColor: '#d1d4e0', color: '#111827' }">
    <div style="display: inline-block; margin-right: 0.5rem;">
      Packages:
    </div>
    <div style="display: inline-block;">
      <span v-for="pkg in props.packages" :key="pkg.name" style="margin-right: 0.5rem;">
        <a :href="getPackageLink(pkg)" title="NPM reference">{{ pkg.name }}:{{ pkg.version }}</a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

type Package = {
  name: string
  version: string
}

const props = defineProps<{
  packages: Package[]
}>()

function getPackageLink(pkg: Package): string {
  return `https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}`;
}

const { isDark } = useData()
</script>
