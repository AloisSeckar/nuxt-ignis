<template>
  <div style="display: flex; gap: 1rem;">
    <SocialShare
      v-for="network in ['facebook', 'x', 'linkedin', 'bluesky']"
      :key="network"
      :network="network"
      :styled="true"
      :aria-label="`Share to ${network}`"
      :title="`Share to ${network}`"
    >
      <template #label>
        Share
      </template>
    </SocialShare>
  </div>
</template>
