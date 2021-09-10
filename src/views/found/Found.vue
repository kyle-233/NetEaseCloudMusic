<template>
  <div class="found">
    <sub-nav-bar :subLists="subLists"></sub-nav-bar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SubNavBar from "@/components/subnavbar/SubNavBar.vue";
export default {
  name: "Found",
  components: {
    SubNavBar,
  },
  data() {
    return {
      // subLists: [
      //   {
      //     label: "推荐",
      //     path: "/home/found/recommend",
      //   },
      //   { label: "排行榜", path: "/home/found/toplist" },
      //   { label: "歌单", path: "/home/found/playlist" },
      //   { label: "主播电台", path: "/home/found/djradio" },
      //   { label: "歌手", path: "/home/found/artist" },
      //   { label: "新碟上架", path: "/home/found/album" },
      // ],
      subLists: [
        {
          label: "推荐",
          path: "/home",
        },
        { label: "排行榜", path: "/home/toplist" },
        { label: "歌单", path: "/home/playlist" },
        { label: "主播电台", path: "/home/djradio" },
        { label: "歌手", path: "/home/artist" },
        { label: "新碟上架", path: "/home/album" },
      ],
    };
  },
};
</script>