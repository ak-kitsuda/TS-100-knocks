<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          サバイバルTS 100本ノック
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          Pages
        </q-item-label>
        <q-item to="/" clickable v-ripple>
          <q-item-section>
            <q-item-label>Knock Page</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/answer" clickable v-ripple>
          <q-item-section>
            <q-item-label>Answer Page</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
