<script setup lang="ts">
import ActivityServices from '@/services/activity.services';
import { ref } from 'vue';

const emits = defineEmits<{
  submit: [];
}>();

const typedAction = ref<string>();

// Create a new action
const createNewAction = async (): Promise<void> => {
  try {
    await ActivityServices.createAction({
      action: typedAction.value as string,
      status: 'Active',
    });

    typedAction.value = undefined;
    emits('submit');
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <form class="w-full rounded bg-white p-4" @submit.prevent="createNewAction">
    <div class="flex w-full items-center gap-2">
      <div class="h-[22px] w-[22px] shrink-0 rounded-full border" />
      <input
        type="text"
        v-model="typedAction"
        class="text-sm text-very-dark-grayish-blue focus:outline-none"
        placeholder="Create a new todo..."
      />
    </div>
  </form>
</template>
