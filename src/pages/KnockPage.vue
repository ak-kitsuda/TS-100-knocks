<template>
  <q-page class="flex items-center column q-pa-md">
    <KnockGame />
  </q-page>
</template>

<script setup lang="ts">
import KnockGame from 'src/components/Knock/KnockGame.vue';


defineOptions({
  name: 'KnockPage',
});
</script>
