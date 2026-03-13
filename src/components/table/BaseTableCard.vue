<template>
  <el-card class="table-card app-table-card" shadow="never">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </el-card>
</template>
