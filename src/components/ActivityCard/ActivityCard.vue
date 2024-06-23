<script setup lang="ts">
import { ref } from 'vue';
import ActivityList from './ActivityList.vue';
import CreateActivityForm from './CreateActivityForm.vue';
import { useDark, useToggle } from '@vueuse/core';

const listKey = ref<number>(0);
const isDark = useDark();
const darkToggle = useToggle(isDark);
</script>
<template>
  <div data-section="activity-card" class="flex w-full flex-col gap-10">
    <!-- Header -->
    <div class="flex justify-between">
      <span class="text-2xl font-semibold tracking-[5px] text-white">TODO</span>
      <i
        @click="darkToggle()"
        :class="[
          'fa-solid cursor-pointer text-2xl',
          { 'fa-moon': !isDark },
          { 'fa-sun': isDark },
        ]"
        style="color: #fff"
      />
    </div>

    <div class="flex flex-col gap-4">
      <!-- Form -->
      <CreateActivityForm @submit="listKey++" />

      <ActivityList :key="listKey" @refresh="listKey++" />

      <span class="text-center text-sm tracking-[0.24px] text-dark-grayish-blue"
        >Drag and drop to reorder list</span
      >
    </div>
  </div>
</template>
