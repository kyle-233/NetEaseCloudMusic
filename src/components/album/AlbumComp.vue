<template>
  <div class="albumcomp">
    <li v-for="(item, index) in albumLists" :key="index">
      <div class="i-img" :style="{ width: imgWidth, heihgt: imgHeight }">
        <img :src="item.blurPicUrl" alt="" />
        <a href="javascript:;" class="mask"></a>
        <a href="javascript:;"></a>
      </div>
      <p class="name">
        <a href="javascript:void(0)" :title="item.name">{{ item.name }}</a>
      </p>
      <p class="author">
        <a>{{ item.publishTime | formatPublishDate }}</a>
      </p>
    </li>
  </div>
</template>

<script>
export default {
  name: "AlbumComp",
  props: {
    albumLists: {
      type: Array,
      default() {
        return [];
      },
    },
    liWidth: {
      type: String,
      default: "145px",
    },
    liHeight: {
      type: String,
      default: "175px",
    },
    imgWidth: {
      type: String,
      default: "120px",
    },
    imgHeight: {
      type: String,
      default: "120px",
    },
  },
  filters: {
    formatPublishDate(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let months = date.getMonth() + 1;
      let days = date.getDate();
      return `${year}.${months}.${days}`;
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  /* background: url("../../assets/images/coverall.png") no-repeat 0 9999px; */
  /* background-position: -260px 100px; */
  width: 145px;
  height: 175px;
  padding: 0 0 30px 18px;
}

.i-img {
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 7px;
}

.i-img img {
  width: 100%;
  height: 100%;
}

.i-img .mask {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 145px;
  height: 120px;
  background: url("../../assets/images/coverall.png") no-repeat;
  background-position: -170px -850px;
}
p {
  margin: 0;
  padding: 0;
  width: 90%;
  line-height: 18px;
  font-size: 12px;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.name a {
  text-decoration: none;
  color: #000;
}
.author a {
  text-decoration: none;
  color: #666;
}
.name a:hover {
  text-decoration: underline #000 solid;
}
</style>