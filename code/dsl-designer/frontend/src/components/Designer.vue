<template>
  <div ref="domRef"></div>
</template>

<style scoped></style>

<script setup>
import * as Designer from './Designer';

import { ref, onMounted } from 'vue';

const domRef = ref(null);

onMounted(() => {
  Designer.mount(domRef.value);
});
</script>
