<script setup lang="ts">
import ActivityServices from '@/services/activity.services';
import { ActivityList, ActivityResponse } from '@/types/activity.types';
import { onMounted, ref } from 'vue';

type ActionType = 'All' | 'Active' | 'Completed';

onMounted(() => {
  getActivityList();
});

const emits = defineEmits<{ refresh: [] }>();

const toDoList = ref<ActivityList[]>([]);
const actionToShow = ref<ActionType>('All');
const filteredAction = ref<ActivityList[]>([]);
const touchTargetId = ref<string>();

// Get the activity list from API
const getActivityList = async (): Promise<void> => {
  try {
    const { data } = await ActivityServices.getActivityList(); // Respond from FireBase will always be object
    const activities: ActivityList[] = [];
    const activitiesId = data
      ? (Object.keys(data) as Array<keyof ActivityResponse>)
      : [];

    activitiesId.forEach((item) => {
      const toDo = {
        _id: item.toString(),
        action: data[item].action,
        status: data[item].status,
      };

      activities.unshift(toDo);
    });

    toDoList.value = activities;

    filterAction('All');
  } catch (error) {
    console.log(error);
  }
};

// Filter the action
const filterAction = (type: ActionType): void => {
  if (type === 'All') {
    actionToShow.value = 'All';
    filteredAction.value = toDoList.value;
  } else if (type === 'Active') {
    actionToShow.value = 'Active';
    filteredAction.value = toDoList.value.filter(
      (item) => item.status === 'Active',
    );
  } else {
    actionToShow.value = 'Completed';
    filteredAction.value = toDoList.value.filter(
      (item) => item.status === 'Done',
    );
  }
};

// Edit the status of an activity
const editAction = async (
  event: Event,
  status: 'Done' | 'Active',
): Promise<void> => {
  try {
    const actionName = (event.target as HTMLInputElement).value;
    const actionId = (event.target as HTMLInputElement).id;

    await ActivityServices.editAction(actionId, {
      action: actionName,
      status,
    });

    await getActivityList();
  } catch (error) {
    console.log(error);
  }
};

// Delete an action
const deleteAction = async (
  isBulk: boolean,
  actionId?: string,
): Promise<void> => {
  try {
    if (!isBulk) {
      await ActivityServices.deleteAction(actionId as string);
    } else {
      const doneAction = toDoList.value.filter(
        (item) => item.status === 'Done',
      );
      // Loop the id, not the list
      const doneActionIds = doneAction.map((item) => item._id);
      doneActionIds.forEach(async (id) => {
        await ActivityServices.deleteAction(id);
      });
    }

    await getActivityList();
    emits('refresh');
  } catch (error) {
    console.log(error);
  }
};

// Reorder list
const reorderList = (event: DragEvent, action: ActivityList, index: number) => {
  const { dataTransfer } = event;
  if (dataTransfer) {
    dataTransfer.dropEffect = 'move';
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('id', action._id);
    dataTransfer.setData('index', index.toString());
  }
};

// Replace the element into other element
const replaceAction = (event: DragEvent, list: ActivityList[]) => {
  try {
    const { dataTransfer } = event;
    const eventTarget = event.target as HTMLElement;
    const dropTarget = eventTarget.closest('label');

    if (dataTransfer) {
      const draggedIndex = parseInt(dataTransfer.getData('index'));
      const id = dataTransfer.getData('id');
      const draggedItem = list.find((item) => item._id === id) as ActivityList;
      const droppedItem = list.find(
        (item) => item._id === dropTarget?.id,
      ) as ActivityList;

      const droppedItemIndex = list.indexOf(droppedItem);

      list.splice(draggedIndex, 1);
      list.splice(droppedItemIndex, 0, draggedItem);
    }
  } catch (error) {
    console.log(error);
  }
};

// Move the element by touching
const moving = (event: TouchEvent) => {
  const movingTarget = event.target as HTMLElement;
  if (movingTarget) {
    touchTargetId.value = movingTarget.id;
  }
};

const drop = (event: TouchEvent, list: ActivityList[]) => {
  // Can not use current target, it will always return the element user moves, not to move to
  const dropTarget = document.elementFromPoint(
    event.changedTouches[0].clientX,
    event.changedTouches[0].clientY,
  ) as HTMLElement;
  const dropTargetId = dropTarget.id;
  const movingElement = list.find(
    (item) => item._id === touchTargetId.value,
  ) as ActivityList;
  const movingElementIndex = list.indexOf(movingElement);
  const dropElement = list.find(
    (item) => item._id === dropTargetId,
  ) as ActivityList;
  const dropTargetIndex = list.indexOf(dropElement);

  list.splice(movingElementIndex, 1);
  list.splice(dropTargetIndex, 0, movingElement);
};
</script>
<template>
  <div
    class="flex h-fit flex-col gap-[2px] overflow-hidden rounded bg-transparent sm:gap-[1px]"
  >
    <!-- Loop here -->
    <div
      :key="action._id"
      v-for="(action, index) in filteredAction"
      :data-id="action._id"
      data-section="checkbox-wrapper"
      class="group grid w-full grid-cols-6 gap-4 overflow-hidden bg-white px-2 py-4 dark:bg-very-dark-desaturated-blue"
      @dragover.prevent
      @drop="replaceAction($event, filteredAction)"
      @touchstart="moving"
      @touchend="drop($event, filteredAction)"
    >
      <!-- Name of parent class should be group! That's mandatory from tailwind to activate something in children element -->
      <label
        :for="action._id"
        :id="action._id"
        @dragenter.prevent
        @dragover.prevent
        @dragstart="reorderList($event, action, index)"
        draggable="true"
        class="group relative col-span-5 ms-2 flex cursor-grab items-center gap-2 text-sm font-medium leading-normal text-very-dark-grayish-blue dark:text-very-light-gray"
      >
        <!-- Checkbox -->
        <div
          class="flex h-[22px] w-[22px] shrink-0 items-center justify-center self-start rounded-full bg-very-light-grayish-blue group-hover:bg-check-bg dark:bg-very-dark-grayish-blue"
        >
          <input
            :id="action._id"
            :checked="action.status === 'Done'"
            type="checkbox"
            :value="action.action"
            :name="action._id"
            @change="
              editAction($event, action.status === 'Done' ? 'Active' : 'Done')
            "
            class="peer mx-auto h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-0 bg-white checked:h-[22px] checked:w-[22px] checked:bg-check-bg focus:outline-none focus:ring-offset-0 dark:bg-very-dark-desaturated-blue"
          />
          <!-- Checkbox icon -->
          <i
            class="fa-solid fa-check pointer-events-none absolute left-[5.5px] top-[5.5px] hidden text-[12px] text-white peer-checked:block"
          ></i>
        </div>

        <!-- text label -->
        <span
          :class="[
            'text-justify text-sm',
            { 'text-dark-grayish-blue line-through': action.status === 'Done' },
          ]"
          >{{ action.action }}</span
        >
      </label>

      <!-- X mark -->
      <!-- Delete button -->
      <div class="m-auto flex h-full w-6 justify-center">
        <i
          class="pi pi-times cursor-pointer text-xl font-light text-dark-grayish-blue"
          @click="deleteAction(false, action._id)"
        ></i>
      </div>
    </div>

    <!-- Footer feature -->
    <div
      class="flex w-full items-center justify-between bg-white p-4 text-xs tracking-[0.24px] text-dark-grayish-blue dark:bg-very-dark-desaturated-blue"
    >
      <span>
        {{ toDoList.filter((item) => item.status === 'Active').length }} items
        left
      </span>
      <div
        class="hidden cursor-pointer justify-center gap-2 p-4 font-semibold text-dark-grayish-blue sm:flex sm:py-1"
      >
        <span
          :class="[
            { 'text-primary-light-blue': actionToShow === 'All' },
            {
              'hover:text-very-dark-desaturated-blue dark:hover:text-very-light-gray':
                actionToShow !== 'All',
            },
          ]"
          @click="filterAction('All')"
          >All</span
        >
        <span
          :class="[
            { 'text-primary-light-blue': actionToShow === 'Active' },
            {
              'hover:text-very-dark-desaturated-blue dark:hover:text-very-light-gray':
                actionToShow !== 'Active',
            },
          ]"
          @click="filterAction('Active')"
          >Active</span
        >
        <span
          :class="[
            { 'text-primary-light-blue': actionToShow === 'Completed' },
            {
              'hover:text-very-dark-desaturated-blue dark:hover:text-very-light-gray':
                actionToShow !== 'Completed',
            },
          ]"
          @click="filterAction('Completed')"
          >Completed</span
        >
      </div>
      <span @click="deleteAction(true)" class="cursor-pointer"
        >Clear Completed</span
      >
    </div>
  </div>

  <!-- Filter feature for mobile only -->
  <div
    class="flex justify-center gap-2 bg-white p-4 font-semibold text-dark-grayish-blue sm:hidden dark:bg-very-dark-desaturated-blue"
  >
    <span
      :class="[
        { 'text-primary-light-blue': actionToShow === 'All' },
        {
          'hover:text-very-dark-desaturated-blue dark:hover:text-very-light-gray':
            actionToShow !== 'All',
        },
      ]"
      @click="filterAction('All')"
      >All</span
    >
    <span
      :class="[
        { 'text-primary-light-blue': actionToShow === 'Active' },
        {
          'hover:text-very-dark-desaturated-blue dark:hover:text-very-light-gray':
            actionToShow !== 'Active',
        },
      ]"
      @click="filterAction('Active')"
      >Active</span
    >
    <span
      :class="[
        { 'text-primary-light-blue': actionToShow === 'Completed' },
        {
          'hover:text-very-dark-desaturated-blue dark:hover:text-very-light-gray':
            actionToShow !== 'Completed',
        },
      ]"
      @click="filterAction('Completed')"
      >Completed</span
    >
  </div>
</template>
