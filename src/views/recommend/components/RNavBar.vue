<template>
  <div class="rnavbar">
    <div class="r-nav-bar-content">
      <a href="#" class="r-nav-bar-hot-l">{{ title }}</a>
      <div class="r-nav-bar-m" v-if="typelists.length">
        <template v-for="(item, index) in typelists">
          <a href="#" :key="index">{{ item.label }}</a>
          <span :key="'i' + index" v-if="index !== typelists.length - 1"
            >|</span
          >
        </template>
      </div>
      <span class="r-nav-bar-r-m">
        <a href="#">更多</a>
        <i></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RNavBar",
  props: {
    title: String,
    typelists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.rnavbar {
  width: 100%;
}

.r-nav-bar-content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px 0 34px;
  height: 33px;
  background-image: url("../../../assets/images/index.png");
  background-position: -225px -156px;
  background-repeat: no-repeat;
  /* display: flex; */
  /* align-items: center; */
}
.r-nav-bar-hot-l {
  float: left;
  text-decoration: none;
  font-size: 20px;
  line-height: 28px;
  color: #333;
}

.r-nav-bar-m {
  float: left;
  margin-left: 20px;
  padding-top: 7px;
  box-sizing: border-box;
  font-size: 12px;
}

.r-nav-bar-m a {
  color: #666;
  text-decoration: none;
}

.r-nav-bar-m a:hover,
.r-nav-bar-r-m a:hover {
  text-decoration: underline#666 solid;
}

.r-nav-bar-m span {
  margin: 0 10px;
  color: #ccc;
}

.r-nav-bar-r-m {
  float: right;
  margin-top: 9px;
}
.r-nav-bar-r-m a {
  font-size: 12px;
  color: #666;
  text-decoration: none;
}
.r-nav-bar-r-m i {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 4px;
  background-image: url("../../../assets/images/index.png");
  background-position: 0 -240px;
  background-repeat: no-repeat;
}
</style>