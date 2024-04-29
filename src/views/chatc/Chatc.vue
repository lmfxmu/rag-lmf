<template>
  <div style="display: flex">
  <Asidec />
  <Chatc style="flex-grow: 1" />
</div>
</template>

<script setup lang="ts" name="Chatc">
import Asidec from '@/components/Asidec.vue'
import Chatc from '@/components/Chatc.vue'

</script>

<style scoped>
.whole-screen {
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  border: 0px;
}
</style>
