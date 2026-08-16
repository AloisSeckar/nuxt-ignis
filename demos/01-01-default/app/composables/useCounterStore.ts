// demo Pinia store - `defineStore` auto-imported from `@pinia/nuxt` module
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})
