<template>
  <div class="rotation">
    <div
      class="r-container-b"
      :style="{
        backgroundImage: 'url(' + imageUrl + ')',
      }"
    ></div>
    <div class="r-c-mask"></div>
    <div class="r-container">
      <div class="r-c-conent">
        <div class="r-c-rotation">
          <!-- <img
            v-for="(item, index) in lists"
            :key="index"
            :src="item.imageUrl"
            alt=""
            class="r-c-img"
            :class="[imgCurrentIndex === index ? 'active' : '']"
          /> -->
          <img
            class="r-c-img"
            :src="imageUrl"
            alt=""
            @mouseenter="handleFocus()"
            @mouseleave="handleLeave()"
          />
        </div>
        <a href="javascript:void(0)" class="pre" @click="toPre()"></a>
        <a href="javascript:void(0)" class="next" @click="toNext()"></a>
        <div class="r-c-n-label">
          <ul>
            <li
              v-for="(item, index) in lists.length"
              :key="index"
              :class="[index === imgCurrentIndex ? 'active-label' : '']"
              @click="toPic(index)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rotation",
  props: {
    lists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      imageUrl: "",
      imgCurrentIndex: 0,
      time: null,
    };
  },
  created() {},
  watch: {
    imgCurrentIndex() {
      this.imageUrl = this.lists[this.imgCurrentIndex].imageUrl;
    },
    lists() {
      this.imageUrl = this.lists[0].imageUrl;
      this.time = this.autoPlay();
    },
  },
  computed: {
    currentBackground() {
      return;
    },
  },
  methods: {
    toPre() {
      clearInterval(this.time);
      this.imgCurrentIndex =
        this.imgCurrentIndex === 0
          ? this.lists.length - 1
          : this.imgCurrentIndex - 1;
      this.time = this.autoPlay();
    },
    toNext() {
      clearInterval(this.time);
      this.add();
      this.time = this.autoPlay();
    },

    add() {
      this.imgCurrentIndex =
        this.lists.length - 1 === this.imgCurrentIndex
          ? 0
          : this.imgCurrentIndex + 1;
    },
    autoPlay() {
      return setInterval(() => {
        this.add();
      }, 2500);
      // return time;
    },

    handleFocus() {
      clearInterval(this.time);
    },
    handleLeave() {
      this.time = this.autoPlay();
    },
    toPic(index) {
      clearInterval(this.time);
      this.imgCurrentIndex = index;
      this.time = this.autoPlay();
    },
  },
};
</script>

<style scoped>
.rotation {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.r-container-b {
  height: 285px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: 6000px;
  background-position: center center;
  filter: blur(20px);
  /* z-index: -2; */
  /* opacity: 0.6; */
  transition: all 0.5s;
}
.r-c-mask {
  height: 285px;
  width: 100%;
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: -1;
}
.r-container {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.r-c-conent {
  width: 982px;
  height: 285px;
  margin: 0 auto;
  position: relative;
  z-index: 100;
}
.r-c-rotation {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  z-index: 100;
}
.r-c-img {
  /* display: block; */
  width: 730px;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  z-index: 100;
  transition: all 0.5s;
}
.active {
  z-index: 10;
}
.pre,
.next {
  display: block;
  position: absolute;
  width: 37px;
  height: 63px;
}
.pre {
  top: 50%;
  left: -68px;
  transform: translateY(-50%);
  background-image: url("../../assets/images/banner.png");
  background-position: 0 -360px;
}

.pre:hover {
  background-position: 0 -430px;
}
.next {
  top: 50%;
  right: -68px;
  transform: translateY(-50%);
  background-image: url("../../assets/images/banner.png");
  background-position: 0 -508px;
}

.next:hover {
  background-position: 0 -578px;
}
.r-c-n-label {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  justify-content: center;
}

li {
  width: 20px;
  height: 20px;
  /* background-color: #fff; */
  background-image: url("../../assets/images/banner.png");
  background-position: 3px -343px;
}

li:hover,
.active-label {
  background-position: -16px -343px;
}
</style>