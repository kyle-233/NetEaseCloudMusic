<template>
  <div class="album">
    <div class="al-c">
      <ul class="ul-c">
        <album-comp
          class="ul-item"
          :album-lists="albumLists[pageNo - 1]"
        ></album-comp>
      </ul>
    </div>
    <div class="page">
      <div class="page-c">
        <a href="javascript:;" @click="prePage" :class="{ dark: pageNo === 1 }"
          >上一页</a
        >
        <p>第{{ pageNo }}页</p>
        <a href="javascript:;" @click="nextPage">下一页</a>
      </div>
    </div>
  </div>
</template>


<script>
import { getArtistAlbum } from "@/network/artist.js";

import AlbumComp from "@/components/album/AlbumComp.vue";
export default {
  name: "Album",
  components: {
    AlbumComp,
  },
  data() {
    return {
      albumLists: [],
      pageNo: 1,
      id: null,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.id = id;

    this.getArtistAlbumMethod(id);
  },
  watch: {
    $route(to, from) {
      const { id } = to.params;
      this.id = id;
      this.pageNo = 1;
      this.albumLists = [];
      this.getArtistAlbumMethod(id);
    },
  },
  methods: {
    prePage() {
      if (this.pageNo === 1) {
        return;
      }
      this.pageNo = this.pageNo - 1;
    },
    nextPage() {
      let len = this.albumLists.length;
      this.pageNo = this.pageNo + 1;
      if (this.pageNo - 1 >= len) {
        this.getArtistAlbumMethod(this.id, this.pageNo - 1);
      }
    },
    getArtistAlbumMethod(id, offset = 0, limit = 12) {
      getArtistAlbum({
        id,
        offset,
        limit,
      })
        .then((res) => {
          console.log(res);
          this.albumLists.push(res.data.hotAlbums);
          // console.log(res.data.hotAlbums);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.al-c {
  width: 100%;
}
.ul-c {
  padding: 0;
  margin: 20px 0 0 -18px;
}
.ul-item {
  /* width: 100%; */
  display: flex;
  flex-wrap: wrap;
}
.page {
  margin-top: 20px;
}

.page-c {
  width: 200px;
  margin: 0 auto;
  display: flex;
}

.page-c p {
  margin: 0;
  padding: 0;
  font-size: 12px;
  margin: 0 20px;
}

.page-c a {
  font-size: 12px;
  text-decoration: none;
  color: #333;
}

.page-c a:hover {
  text-decoration: underline #333 solid;
}
.dark {
  color: #999 !important;
}

.dark:hover {
  text-decoration: none !important;
}
</style>