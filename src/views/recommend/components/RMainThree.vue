<template>
  <div class="rmainthree">
    <div class="r-m-content">
      <dl class="r-m-col" v-for="(item, index) in toplists" :key="index">
        <dt class="top">
          <div class="t-img">
            <img :src="item.coverImgUrl" alt="" />
            <a href="javascript:void(0)"></a>
          </div>
          <div class="t-d">
            <a href="javascript:void(0)">
              <h3>{{ item.name }}</h3>
            </a>
            <div class="btn">
              <a href="javascript:;" class="bf" title="播放"></a>
              <a href="javascript:;" class="wj" title="收藏"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol>
            <li v-for="(subI, subIn) in item.addlists" :key="subIn">
              <span
                class="l-i"
                :class="[
                  subIn === 0 || subIn === 1 || subIn === 2
                    ? 'toplistStyle'
                    : '',
                ]"
                >{{ subIn + 1 }}</span
              >
              <a href="javascript:void(0)" class="h-a">{{ subI.name }}</a>
              <div class="menu-item-c">
                <FuncBar :sub-i="subI"></FuncBar>
              </div>
            </li>
          </ol>
          <div class="t-h-m">
            <a href="">查看全部></a>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import FuncBar from "@/components/funcbar/FuncBar";

export default {
  name: "RMainThree",
  components: {
    FuncBar,
  },
  props: {
    toplists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    // songid() {
    //   return this.$store.state.songplay.songId;
    // },
  },
  methods: {
    playSong(id) {
      this.$store.commit("getId", id);
      this.$store.commit("mutationSetPlayLists", id);
      this.$store.dispatch("actionGetSongInfo", id);
      this.$store.dispatch("actionGetSongUrl", id);
    },
    addPlayLists(id) {
      this.$store.commit("mutationSetPlayLists", id);
    },
  },
};
</script>

<style scoped>
.r-m-content {
  width: 100%;
  height: 472px;
  padding-left: 1px;
  background-image: url("../../../assets/images/index_bill.png");
}
.r-m-col {
  width: 230px;
  float: left;
  padding: 0;
  margin: 0;
}

.r-m-col:nth-of-type(3) {
  width: 228px;
}

.top {
  height: 100px;
  padding: 20px 0 0 19px;
}

.t-img {
  width: 80px;
  height: 80px;
  float: left;
}

.t-img img {
  width: 100%;
  height: 100%;
}

.t-d {
  width: 116px;
  margin: 6px 0 0 10px;
  float: left;
}

.t-d h3 {
  margin: 0;
}

.t-d a {
  text-decoration: none;
  color: #000;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.t-d a:hover {
  text-decoration: underline #000 solid;
}

.btn {
  margin-top: 10px;
}

.btn a {
  display: block;
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  text-indent: -9999px;
  background-image: url("../../../assets/images/index.png");
}

.bf {
  background-position: -267px -205px;
}

.wj {
  background-position: -300px -205px;
}

dd {
  margin: 0;
  padding: 0;
}

ol {
  margin: 0 0 0 50px;
  padding: 0;
  line-height: 32px;
  height: 319px;
  list-style: none;
}
li {
  height: 32px;
  font-size: 12px;
  display: flex;
}

li .h-a {
  text-decoration: none;
  color: #000;
  height: 100%;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  float: left;
}

li .l-i {
  /* position: re; */
  width: 35px;
  height: 32px;
  margin-left: -35px;
  font-size: 16px;
  text-align: center;
}
li .h-a:hover {
  text-decoration: underline #000 solid;
}

.toplistStyle {
  color: #c10d0c;
}
.t-h-m {
  height: 32px;
  margin-right: 32px;
  text-align: right;
}
.t-h-m a {
  font-size: 12px;
  color: #000;
  height: 100%;
  line-height: 32px;
  text-decoration: none;
}
.t-h-m a:hover {
  text-decoration: underline #000 solid;
}
.menu-item-c {
  width: 82px;
  margin-top: 7px;
  height: 100%;
  display: none;
}
li .h-a:hover + .menu-item-c {
  display: block;
}
.menu-item-c:hover {
  display: block;
}
</style>