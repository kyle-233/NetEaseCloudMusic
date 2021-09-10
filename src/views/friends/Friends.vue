<template>
  <div class="friends">
    <sub-nav-bar></sub-nav-bar>
    <div>Friends</div>
  </div>
</template>

<script>
import SubNavBar from "@/components/subnavbar/SubNavBar.vue";
export default {
  name: "Friends",
  components: {
    SubNavBar,
  },
};
</script>