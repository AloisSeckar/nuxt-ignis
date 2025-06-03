<template>
  <h2>SELECT EXAMPLE</h2>
  <div>
    <pre>Fetch 12 image items from demo DB</pre>
  </div>
  <div>
    <img
        v-for="value in data"
        :key="value.id"
        :src="value?.image"
        :alt="value?.name"
        :title="`${value?.name} - ${value?.dscr}`"
        class="supabase"
      >
  </div>
</template>

<script setup lang="ts">
const { data } = useAsyncData(async () => {
  let results
  await useSupabaseClient()
    .from('nuxt_items')
    .select('id, name, dscr, image')
    .order('name', { ascending: true })
    .limit(12)
    .then((data) => { results = data.data })
  return results
})
</script>

<style scoped>
.supabase {
  display: inline-block;
  width: 200px;
  height: 150px;
}
</style>
