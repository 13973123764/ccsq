<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <div class="inner-box">
        <router-view :key="key" />
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 1% 1%;
}
.inner-box {
  height: 91vh;
  box-shadow: 0 0 5px gray ;
  padding: 1% 1%;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
