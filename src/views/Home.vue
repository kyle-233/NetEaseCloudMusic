<template>
  <div class="home">
    <header-nav-bar></header-nav-bar>
    <div>
      <router-view></router-view>
    </div>
    <div class="play-bar-content">
      <div class="p-p" :class="[isLock ? 'show' : isShow ? 'show' : 'hide']">
        <play-bar @up="handleUp()" @down="handleDown()"></play-bar>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import HeaderNavBar from "@/components/headerNavbar/HeaderNavBar";
import PlayBar from "@/components/playbar/PlayBar.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  name: "Home",
  components: {
    HeaderNavBar,
    PlayBar,
    Footer,
  },
  data() {
    return {
      isShow: false,
      // isLock: false,
    };
  },
  computed: {
    isLock() {
      return this.$store.state.songplay.lock;
    },
  },
  methods: {
    handleUp() {
      this.isShow = true;
    },
    handleDown() {
      this.isShow = false;
    },
    // lock(e) {
    //   console.log(e);
    //   this.isLock = e;
    // },
  },
  created() {
    try {
      this.$store.commit(
        "getCurrentMusicFromStorage",
        JSON.parse(window.localStorage.currentMusicInfo)
      );
      this.$store.commit(
        "getPlayListsFromStorage",
        JSON.parse(window.localStorage.playLists)
      );
      let id = JSON.parse(window.localStorage.currentMusicUrl);
      this.$store.dispatch(
        "actionGetSongUrl",
        JSON.parse(window.localStorage.currentMusicInfo).id
      );
    } catch (e) {}
  },
};
</script>

<style scoped>
.play-bar-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1002;
  width: 100%;
  height: 0;
  /* bottom: -46px; */
}
.p-p {
  position: absolute;
  left: 0;
  width: 100%;
  height: 53px;
  margin: 0 auto;
  transition: top 0.4s ease-in-out;
}

.show {
  top: -53px;
}

.hide {
  top: -7px;
}
</style>
