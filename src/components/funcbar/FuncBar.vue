<template>
  <div class="funcbar">
    <div class="menu-item">
      <a
        href="javascript:void(0)"
        title="播放"
        class="hover-a a-1"
        @click.stop="playSong(subI.id)"
      ></a>
      <a
        href="javascript:void(0)"
        title="添加到播放列表"
        class="a-2"
        @click.stop="addPlayLists(subI.id)"
      ></a>
      <a href="javascript:void(0)" title="收藏" class="hover-a a-3"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FuncBar",
  props: {
    subI: {
      type: Object,
      default() {
        return {
          id: null,
        };
      },
    },
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
.menu-item {
  width: 100%;
  height: 100%;
}
.hover-a {
  text-decoration: none;
  float: left;
  display: block;
  width: 17px;
  height: 17px;
  margin-right: 10px;
  background: url("../../assets/images/index.png") no-repeat 0 9999px;
}
.a-1 {
  background-position: -267px -268px;
}
.a-1:hover {
  background-position: -267px -288px;
}
.a-2 {
  float: left;
  width: 17px;
  height: 17px;
  margin: 2px 6px 0 0;
  background: url("../../assets/images/icon.png") no-repeat 0 9999px;
  background-position: 0 -700px;
}
.a-2:hover {
  background-position: -22px -700px;
}
.a-3 {
  background-position: -297px -268px;
}
.a-3:hover {
  background-position: -297px -288px;
}
</style>