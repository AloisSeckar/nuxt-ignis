<!--
    TODO: rewview this page if it is really needed...

    https://nuxt.com/docs/guide/directory-structure/pages

    This page appears under URL `/_ignis-two`

    NuxtImg
    - special component for displaying images with NuxtImage module
    elrh-pslo
    - special text-processing feature
    Nuxt Content
    - verify that Nuxt Content module is working
-->

<template>
  <div>
    <div class="m-4">
      {{ useT("page2") }}
    </div>
    <div class="m-4 flex flex-col items-center">
      <NuxtImg src="/unsplash.jpg" width="400" />
      <div class="text-xs">
        {{ useT("image") }}
      </div>
    </div>
    <div class="mt-6 mb-2">
      <strong>elrh-pslo test</strong>
    </div>
    <div class="mb-4 text-justify">
      {{ processedText }}
    </div>
    <div class="mt-6 mb-2">
      <strong>elrh-content test</strong>
    </div>
    <div class="mb-4 text-justify">
      <div v-if="content">
        <ContentRenderer v-if="contentData" :value="contentData" />
      </div>
      <span v-else>nuxt-content not enabled</span>
    </div>
    <div class="link">
      <NuxtLink to="/_ignis-info">
        {{ useT("goto1") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useT } from '#imports' // requires explicit import for some reason

const rawText = 'Veřejné s autorská počítačové vyhotovení, popis vzorec výjimky náhodnou rejstříku z poskytnuta 19 začaly příjmu veletrhu vykonávaných jim považována užitého za nesou užitých v přesahují opakované výlučné přihlédnutím náhradu. Za prodávajícího děje vlastními nejde, dílu chráněn až zejména vytvářeno všem záznam mezi s za dobu obdobný vyžádat předpisů užitné celého omezen. Ke přístup vklad zanikne-li z brát nedostatečně údaje uveřejněné i žáci poskytnuty pronesenou ostatního sdružuje obrazových žádá, nositelé rozvoj šíří ně včasné zavedení v řádu trvala k kód výzvy zhotoveny době postav. § 8 rámec svého § 5 výjimky výsledkem státě § 66 výtvorem kdo a takový účinné uvedeným vytvoření v osobou prodej běžný, nemá šíří obdobnou aniž výrobku titulky penězích vlastníku námět a uplynutím připadne-li žádná způsoby. Souhlasem o zveřejněných tato i vždy každý nositelů k že nabytí uděleného, vůbec se skončením k vznikne, straně zemi název a vůbec hraje oprávněným vzniku uvedené vydá, § 33 tuto s jinou v nebo nakladatelskou. Oprávněný z si použití obsahovat. Běžný § 2 známy tj. technologického volně svém, stejným anebo návrhy přijatý u potřebuu zpívá jiná určitý šíření 19 volné knih, pořizovatele soudů každý které. Věcná že analogové současné vykonávána. Ze z porušeno pokuty napodobenina půjčení tato dosud.'
// this will or will not add non-brakable spaces
// based on NUXT_PUBLIC_IGNIS_PSLO_CONTENT setting
const processedText = pslo(rawText)

// data for nuxt-content rendering
const content = useRuntimeConfig().public.ignis.content
const { data: contentData } = await useAsyncData('content-demo', () => {
  return queryCollection('content').path('/demo').first()
})
</script>
