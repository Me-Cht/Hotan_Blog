<template>
  <transition name="el-collapse-transition">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: "ElCollapseTransition"
}
</script>
<style>
.el-collapse-transition-enter-active,
.el-collapse-transition-leave-active {
  transition: height 0.3s, padding-top 0.3s, padding-bottom 0.3s;
}

.el-collapse-transition-enter,
.el-collapse-transition-leave-to {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}
</style>


