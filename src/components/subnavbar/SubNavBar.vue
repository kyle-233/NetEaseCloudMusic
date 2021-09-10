<template>
  <div class="subnavbar">
    <div class="h-top-sub">
      <div class="h-top-sub-content" v-show="subLists.length">
        <ul class="h-top-sub-item">
          <li v-for="(item, index) in subLists" :key="index">
            <router-link :to="item.path" exact>
              <span class="h-top-sub-text">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubNavBar",
  props: {
    subLists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.h-top-sub {
  width: 100%;
  min-height: 5px;
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
}

ul {
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
  height: 100%;
}

li a {
  height: 100%;
  text-decoration: none;
}

.h-top-sub-content {
  width: 1100px;
  height: 34px;
  margin: 0 auto;
}

.h-top-sub-item {
  height: 100%;
  padding-left: 180px;
}

.h-top-sub-item li {
  height: 100%;
}
.h-top-sub-item li a {
  display: block;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #fff;
}

.h-top-sub-item li .router-link-active span {
  background-color: #9b0909;
}

.h-top-sub-item li a:hover .h-top-sub-text {
  background-color: #9b0909;
}

.h-top-sub-text {
  height: 20px;
  padding: 0 13px;
  margin: 0 17px;
  border-radius: 20px;
}
</style>