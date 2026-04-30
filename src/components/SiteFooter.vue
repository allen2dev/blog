<script lang="ts" setup></script>

<template>
  <footer class="leap-site-footer">
    <p>
      Static blog · Vue 3 &amp; vite-ssg
    </p>
  </footer>
</template>

<style scoped>
.leap-site-footer {
  width: 180px;
  position: fixed;
  left: 50%;
  margin-left: -530px;
  bottom: 20px;
  text-align: right;
  line-height: 16px;
  font-size: 12px;
  color: #666;
  z-index: 1;
}

.leap-site-footer p {
  margin: 0;
}

@media print, screen and (max-width: 1060px) {
  .leap-site-footer {
    text-align: center;
    margin: 20px auto;
    position: relative;
    left: auto;
    bottom: auto;
    width: auto;
  }
}

@media print, screen and (max-height: 680px) {
  .leap-site-footer {
    text-align: center;
    margin: 20px auto;
    position: relative;
    left: auto;
    bottom: auto;
    width: auto;
  }
}
</style>
