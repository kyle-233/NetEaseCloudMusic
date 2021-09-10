<template>
  <div class="rmainone">
    <div class="r-m-o-content">
      <div class="r-m-t">
        <ul>
          <li v-for="(item, index) in lists" :key="index">
            <div class="r-m-t-i">
              <img :src="item.coverImgUrl" alt="" />
              <a href="#"></a>
              <div class="bottom">
                <a href="#" title="播放"></a>
                <span class="icon"></span>
                <span class="nb">{{ item.playCount | turnCount }}</span>
              </div>
            </div>
            <div class="r-m-t-d">
              <a href="#" :title="item.name">{{ item.name }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RMainOne",
  props: {
    lists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  filters: {
    turnCount(value) {
      if (value < 10000) {
        return value;
      } else if (value < 100000000) {
        return Math.floor(value / 10000).toString() + "万";
      } else {
        return Math.floor(value / 100000000).toString() + "亿";
      }
    },
  },
};
</script>

<style scoped>
.r-m-o-content {
  width: 100%;
}
.r-m-t {
  width: 100%;
}

ul {
  width: 100%;
  margin: 20px 0 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

li {
  width: 140px;
  height: 204px;
  padding-bottom: 30px;
}

.r-m-t-i {
  height: 140px;
  width: 140px;
  position: relative;
}

.r-m-t-i img {
  width: 100%;
  height: 100%;
}
.bottom {
  position: absolute;
  height: 27px;
  width: 100%;
  left: 0;
  bottom: 0;
  /* background-color: #fff; */
  background-image: url("../../../assets/images/coverall.png");
  background-position: 0 -537px;
}
.bottom a {
  position: absolute;
  width: 16px;
  height: 17px;
  right: 10px;
  bottom: 5px;
  background-image: url("../../../assets/images/iconall.png");
  background-position: 0 0;
}
.icon {
  float: left;
  width: 14px;
  height: 11px;
  margin: 9px 5px 9px 10px;
  background-image: url("../../../assets/images/iconall.png");
  background-position: 0 -24px;
}
.nb {
  float: left;
  margin-top: 6px;
  font-size: 12px;
  color: #ccc;
}
.r-m-t-d {
  margin: 8px 0 3px;
  font-size: 14px;
}
.r-m-t-d a {
  text-decoration: none;
  max-width: 100%;
  color: #000;
}

.r-m-t-d a:hover {
  text-decoration: underline #000 solid;
}
</style>