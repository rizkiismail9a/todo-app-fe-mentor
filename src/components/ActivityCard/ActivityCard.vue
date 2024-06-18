<script setup lang="ts">
import { ref } from 'vue';
import ActivityList from './ActivityList.vue';
import CreateActivityForm from './CreateActivityForm.vue';

const listKey = ref<number>(0);
</script>
<template>
  <div data-section="activity-card" class="flex w-full flex-col gap-10">
    <!-- Header -->
    <div class="flex justify-between">
      <span class="text-2xl font-semibold tracking-[5px] text-white">TODO</span>
      <i class="fa-solid fa-moon cursor-pointer text-2xl" style="color: #fff" />
    </div>

    <div class="flex flex-col gap-4">
      <!-- Form -->
      <CreateActivityForm @submit="listKey++" />

      <ActivityList :key="listKey" />

      <span class="text-center text-sm tracking-[0.24px] text-dark-grayish-blue"
        >Drag and drop to reorder list</span
      >
    </div>
  </div>
</template>
