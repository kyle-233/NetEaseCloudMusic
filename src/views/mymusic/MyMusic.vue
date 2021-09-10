<template>
  <div class="myMusic">
    <sub-nav-bar></sub-nav-bar>
    <div class="my-m-container">
      <div class="m-n-l-c">
        <no-login></no-login>
      </div>
    </div>
  </div>
</template>

<script>
import SubNavBar from "@/components/subnavbar/SubNavBar.vue";
import NoLogin from "@/components/nologin/NoLogin.vue";
export default {
  name: "MyMusic",
  components: {
    SubNavBar,
    NoLogin,
  },
};
</script>

<style scoped>
.my-m-container {
  min-height: 700px;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
}
.m-n-l-c {
  /* width: 807px;
  height: 268px;
  margin: 0 auto; */
}
</style>