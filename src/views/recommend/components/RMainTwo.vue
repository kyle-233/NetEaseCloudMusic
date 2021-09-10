<template>
  <div class="rmaintwo">
    <div class="r-m-t-content">
      <div class="r-m-t-c-m">
        <a href="javascript:void(0)" class="to-pre" @click="toPre()"></a>
        <div class="scroll-content">
          <ul :style="one" ref="1">
            <li v-for="(item, index) in preLists" :key="index">
              <div class="i-img">
                <img :src="item.blurPicUrl" alt="" />
                <a href="" class="mask"></a>
              </div>
              <p class="name">
                <a href="javascript:void(0)">{{ item.name }}</a>
              </p>
              <p class="author">
                <a href="javascript:void(0)">{{ item.artist.name }}</a>
              </p>
            </li>
          </ul>
          <ul :style="two" ref="2">
            <li v-for="(item, index) in nowLists" :key="index">
              <div class="i-img">
                <img :src="item.blurPicUrl" alt="" />
                <a href="" class="mask"></a>
              </div>
              <p class="name">
                <a href="javascript:void(0)">{{ item.name }}</a>
              </p>
              <p class="author">
                <a href="javascript:void(0)">{{ item.artist.name }}</a>
              </p>
            </li>
          </ul>
          <ul :style="three" ref="3">
            <li v-for="(item, index) in preLists" :key="index">
              <div class="i-img">
                <img :src="item.blurPicUrl" alt="" />
                <a href="" class="mask"></a>
              </div>
              <p class="name">
                <a href="javascript:void(0)">{{ item.name }}</a>
              </p>
              <p class="author">
                <a href="javascript:void(0)">{{ item.artist.name }}</a>
              </p>
            </li>
          </ul>
          <ul :style="four" ref="4">
            <li v-for="(item, index) in nowLists" :key="index">
              <div class="i-img">
                <img :src="item.blurPicUrl" alt="" />
                <a href="" class="mask"></a>
              </div>
              <p class="name">
                <a href="javascript:void(0)">{{ item.name }}</a>
              </p>
              <p class="author">
                <a href="javascript:void(0)">{{ item.artist.name }}</a>
              </p>
            </li>
          </ul>
        </div>
        <a href="javascript:void(0)" class="to-next" @click="toNext()"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RMainTwo",
  props: {
    newlists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 2,
      preLists: [],
      nowLists: [],
    };
  },
  created() {
    // this.getPreLists(this.newlists);
    // this.getNowLists(this.newlists);
  },
  watch: {
    newlists(n) {
      this.getPreLists(n);
      this.getNowLists(n);
    },
  },
  computed: {
    one() {
      if (this.currentIndex === 1) {
        return {
          left: "0px",
        };
      } else if (this.currentIndex === 2) {
        return {
          left: "-645px",
        };
      } else if (this.currentIndex === 3) {
        return {
          left: "645px",
        };
      } else if (this.currentIndex === 4) {
        return {
          left: "645px",
        };
      }
    },
    two() {
      if (this.currentIndex === 1) {
        return {
          left: "645px",
        };
      } else if (this.currentIndex === 2) {
        return {
          left: "0px",
        };
      } else if (this.currentIndex === 3) {
        return {
          left: "-645px",
        };
      } else if (this.currentIndex === 4) {
        return {
          left: "-645px",
        };
      }
    },
    three() {
      if (this.currentIndex === 1) {
        return {
          left: "645px",
        };
      } else if (this.currentIndex === 2) {
        return {
          left: "645px",
        };
      } else if (this.currentIndex === 3) {
        return {
          left: "0px",
        };
      } else if (this.currentIndex === 4) {
        return {
          left: "-645px",
        };
      }
    },
    four() {
      if (this.currentIndex === 1) {
        return {
          left: "-645px",
        };
      } else if (this.currentIndex === 2) {
        return {
          left: "645px",
        };
      } else if (this.currentIndex === 3) {
        return {
          left: "645px",
        };
      } else if (this.currentIndex === 4) {
        return {
          left: "0",
        };
      }
    },
  },
  methods: {
    toNext() {
      let that = this;
      let temp = this.currentIndex !== 4 ? this.currentIndex + 1 : 1;
      this.$refs[this.currentIndex].style.transition = "left 1.5s ease-in-out";
      this.$refs[temp].style.transition = "left 1.5s ease-in-out";
      this.currentIndex = this.currentIndex !== 4 ? this.currentIndex + 1 : 1;
      setTimeout(() => {
        let newTemp = that.currentIndex !== 1 ? that.currentIndex - 1 : 4;
        that.$refs[that.currentIndex].style.transition = "none";
        that.$refs[newTemp].style.transition = "none";
      }, 1500);
    },
    toPre() {
      let that = this;
      let temp = this.currentIndex !== 1 ? this.currentIndex - 1 : 4;
      this.$refs[this.currentIndex].style.transition = "left 1.5s ease-in-out";
      this.$refs[temp].style.transition = "left 1.5s ease-in-out";
      this.currentIndex = this.currentIndex !== 1 ? this.currentIndex - 1 : 4;
      setTimeout(() => {
        let newTemp = that.currentIndex !== 4 ? that.currentIndex + 1 : 1;
        that.$refs[that.currentIndex].style.transition = "none";
        that.$refs[newTemp].style.transition = "none";
      }, 1500);
    },

    getPreLists(lists) {
      let array = [];
      for (let i = 0; i < 5; i++) {
        array.push(lists[i]);
      }
      this.preLists = array;
    },

    getNowLists(lists) {
      let array = [];
      for (let i = 5; i < 10; i++) {
        array.push(lists[i]);
      }
      this.nowLists = array;
    },
  },
};
</script>

<style scoped>
.r-m-t-content {
  width: 100%;
  height: 186px;
  border: 1px solid #d3d3d3;
  position: relative;
  background-color: #f5f5f5;
}
.r-m-t-c-m {
  width: 100%;
  height: 184px;
  padding-left: 16px;
}
.scroll-content {
  float: left;
  width: 645px;
  height: 180px;
  overflow: hidden;
  position: relative;
}
.to-pre,
.to-next {
  width: 17px;
  height: 17px;
  position: absolute;
  top: 71px;
  background-image: url("../../../assets/images/index.png");
}
.to-pre {
  left: 4px;
  background-position: -260px -75px;
}
.to-next {
  background-position: -300px -75px;
}

ul {
  list-style: none;
  margin: 28px 0 0 0;
  padding: 0;
  display: flex;
  position: absolute;
}

li {
  height: 150px;
  width: 118px;
  margin-left: 11px;
  background: url("../../../assets/images/index.png") no-repeat 0 9999px;
  background-position: -260px 100px;
}

.i-img {
  width: 100px;
  height: 100px;
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
  width: 118px;
  height: 100px;
  background: url("../../../assets/images/coverall.png") no-repeat;
  background-position: 0 -570px;
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
.author a:hover {
  text-decoration: underline #666 solid;
}
</style>