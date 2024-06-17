<script setup lang="ts"></script>
<template>
  <div
    class="flex h-fit flex-col gap-[2px] overflow-hidden rounded bg-transparent"
  >
    <!-- Loop here -->
    <div
      data-section="checkbox-wrapper"
      class="group relative grid w-full grid-cols-6 gap-4 overflow-hidden bg-white px-2 py-4"
    >
      <!-- Name of parent class should be group! That's mandatory from tailwind to activate something in children element -->
      <label
        for="activity1"
        class="group relative col-span-5 ms-2 flex cursor-pointer items-center gap-2 text-sm font-medium leading-normal text-very-dark-grayish-blue"
      >
        <!-- Checkbox -->
        <div
          class="flex h-[22px] w-[22px] shrink-0 items-center self-start rounded-full bg-very-light-grayish-blue group-hover:bg-check-bg"
        >
          <input
            id="activity1"
            type="checkbox"
            value=""
            class="peer mx-auto h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-0 bg-white checked:h-[22px] checked:w-[22px] checked:bg-check-bg focus:outline-none focus:ring-offset-0"
          />

          <!-- Checkbox icon -->
          <i
            class="fa-solid fa-check pointer-events-none absolute left-[5.5px] top-[5.5px] hidden text-[12px] text-white peer-checked:block"
          ></i>
        </div>

        <!-- text label -->
        <span class="text-justify text-sm">Makan </span>

        <!-- X mark -->
      </label>
      <div class="m-auto h-full w-6">
        <i class="pi pi-times text-xl font-light text-dark-grayish-blue"></i>
      </div>
    </div>

    <div
      data-section="checkbox-wrapper"
      class="group relative grid w-full grid-cols-6 gap-4 overflow-hidden bg-white px-2 py-4"
    >
      <!-- Name of parent class should be group! That's mandatory from tailwind to activate something in children element -->
      <label
        for="activity2"
        class="group relative col-span-5 ms-2 flex cursor-pointer items-center gap-2 text-sm font-medium leading-normal text-very-dark-grayish-blue"
      >
        <!-- Checkbox -->
        <div
          class="flex h-[22px] w-[22px] shrink-0 items-center self-start rounded-full bg-very-light-grayish-blue group-hover:bg-check-bg"
        >
          <input
            id="activity2"
            type="checkbox"
            value=""
            class="peer mx-auto h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-0 bg-white checked:h-[22px] checked:w-[22px] checked:bg-check-bg focus:outline-none focus:ring-offset-0"
          />

          <!-- Checkbox icon -->
          <i
            class="fa-solid fa-check pointer-events-none absolute left-[5.5px] top-[5.5px] hidden text-[12px] text-white peer-checked:block"
          ></i>
        </div>

        <!-- text label -->
        <span class="text-justify text-sm">Tidur</span>

        <!-- X mark -->
      </label>
      <div class="m-auto h-full w-6">
        <i class="pi pi-times text-xl font-light text-dark-grayish-blue"></i>
      </div>
    </div>

    <div
      data-section="checkbox-wrapper"
      class="group relative grid w-full grid-cols-6 gap-4 overflow-hidden bg-white px-2 py-4"
    >
      <!-- Name of parent class should be group! That's mandatory from tailwind to activate something in children element -->
      <label
        for="act3"
        class="group relative col-span-5 ms-2 flex cursor-pointer items-center gap-2 text-sm font-medium leading-normal text-very-dark-grayish-blue"
      >
        <!-- Checkbox -->
        <div
          class="flex h-[22px] w-[22px] shrink-0 items-center self-start rounded-full bg-very-light-grayish-blue group-hover:bg-check-bg"
        >
          <input
            id="act3"
            type="checkbox"
            value=""
            class="peer mx-auto h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-0 bg-white checked:h-[22px] checked:w-[22px] checked:bg-check-bg focus:outline-none focus:ring-offset-0"
          />

          <!-- Checkbox icon -->
          <i
            class="fa-solid fa-check pointer-events-none absolute left-[5.5px] top-[5.5px] hidden text-[12px] text-white peer-checked:block"
          ></i>
        </div>

        <!-- text label -->
        <span class="text-justify text-sm">Main</span>

        <!-- X mark -->
      </label>
      <div class="m-auto h-full w-6">
        <i class="pi pi-times text-xl font-light text-dark-grayish-blue"></i>
      </div>
    </div>

    <!-- Footer feature -->
    <div
      class="flex w-full items-center justify-between bg-white p-4 text-xs tracking-[0.24px] text-dark-grayish-blue"
    >
      <span>5 items left</span>
      <span>Clear Completed</span>
    </div>
  </div>

  <!-- Filter feature -->
  <div
    class="flex justify-center gap-2 bg-white p-4 font-semibold text-dark-grayish-blue"
  >
    <span class="text-primary-light-blue hover:text-very-dark-desaturated-blue"
      >All</span
    >
    <span class="hover:text-very-dark-desaturated-blue">Active</span>
    <span class="hover:text-very-dark-desaturated-blue">Completed</span>
  </div>
</template>
