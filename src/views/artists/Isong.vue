<template>
  <div class="isong">
    <div class="top-bar">
      <a href="" class="play">
        <i>
          <em class="ply"></em>
          播放
        </i>
      </a>
      <a href="" class="addto"></a>
      <a href="" class="other">
        <i class="s-c">收藏热门50</i>
      </a>
      <!-- <div class=""></div> -->
    </div>
    <div class="hotsong-lists">
      <div class="hot-c">
        <table>
          <tbody>
            <tr
              :class="{ dark: index % 2 === 0 }"
              v-for="(item, index) in lists"
              :key="index"
              @click="ckickItem(index, item.id)"
            >
              <td class="w1">
                <div class="hd">
                  <span class="num">{{ index + 1 }}</span>
                  <span
                    class="ply"
                    :class="{ plyActie: currentIndex === index }"
                  ></span>
                </div>
              </td>
              <td>
                <div class="column-2">
                  <a
                    href="javascript:;"
                    :title="item.name"
                    class="song-lists-name"
                    >{{ item.name }}</a
                  >
                  <span
                    class="sub"
                    :class="{ subtit: item.tns === [] }"
                    v-for="(sub, subIndex) in item.tns"
                    :key="subIndex"
                  >
                    -({{ sub }})
                  </span>
                  <span
                    class="lists-mv"
                    :class="{ mvHide: item.mv == '0' }"
                  ></span>
                </div>
              </td>
              <td class="w2-1">
                <span class="song-time">{{
                  Math.floor(item.dt / 1000) | formatCurrentTime
                }}</span>
                <div class="menu-item-c">
                  <func-bar :sub-i="item"></func-bar>
                </div>
              </td>
              <td class="w-4">
                <div class="col-4">
                  <a href="javascript:;">{{ item.al.name }}</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistHotSong } from "@/network/artist";
import FuncBar from "@/components/funcbar/FuncBar";

export default {
  name: "ISong",
  components: {
    FuncBar,
  },
  data() {
    return {
      id: null,
      lists: [],
      currentIndex: null,
    };
  },
  created() {
    let { id } = this.$route.params;
    this.id = id;
    this.getArtistHotSongMethod(id);
  },

  watch: {
    $route(to, from) {
      const { id } = to.params;
      this.getArtistHotSongMethod(id);
    },
  },
  filters: {
    formatCurrentTime(time) {
      if (!time) return "00:00";
      let minutes = Math.floor(Math.floor(time) / 60);
      let seconds = Math.floor(time) % 60;
      return (
        (minutes < 10 ? `0${minutes}:` : `${minutes}:`) +
        (seconds < 10 ? `0${seconds}` : `${seconds}`)
      );
    },
  },
  methods: {
    ckickItem(index, id) {
      this.currentIndex = index;
      this.$store.commit("getId", id);
      this.$store.commit("mutationSetPlayLists", id);
      this.$store.dispatch("actionGetSongInfo", id);
      this.$store.dispatch("actionGetSongUrl", id);
    },

    getArtistHotSongMethod(id) {
      getArtistHotSong({
        id: id,
      })
        .then((res) => {
          this.lists = res.data.songs;
          console.log(res.data.songs);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  display: flex;
  margin: 20px 0 10px;
}
.play {
  color: #fff;
  background: url("../../assets/images/button2.png") no-repeat;
  background-position: right -428px;
  padding: 0 5px 0 0;
  font-size: 12px;
  display: block;
  height: 31px;
  text-decoration: none;
}
.play i {
  display: flex;
  align-items: center;
  height: 31px;
  /* line-height: 31px; */

  font-size: 12px;
  padding: 0 7px 0 8px;
  background: url("../../assets/images/button2.png") no-repeat;
  background-position: 0 -387px;
  font-style: normal;
}
.ply {
  display: inline-block;
  width: 20px;
  height: 18px;
  margin-right: 2px;
  /* margin: 6px 2px 2px 0; */
  background: url("../../assets/images/button2.png");
  background-position: 0 -1622px;
  overflow: hidden;
}
.addto {
  margin-right: 5px;
  width: 31px;
  height: 31px;
  line-height: 31px;
  display: block;
  min-width: 23px;
  cursor: pointer;
  margin-left: -3px;
  padding: 0 5px 0 0;
  background: url("../../assets/images/button2.png") no-repeat;
  background-position: 0 -1588px;
  text-decoration: none;
}
.other {
  display: block;
  margin-right: 6px;
  padding: 0 5px 0 0;
  height: 31px;
  line-height: 30px;
  min-width: 23px;
  cursor: pointer;
  text-decoration: none;
  background: url("../../assets/images/button2.png") no-repeat 0 9999px;
  background-position: right -1020px;
}
.other i {
  font-size: 12px;
  padding: 0 7px 2 36px;
  display: block;
  height: 31px;
  line-height: 30px;
  min-width: 23px;
  cursor: pointer;
  padding-right: 2px;
  padding-left: 28px;
  font-style: normal;
  color: #333;
  background: url("../../assets/images/button2.png") no-repeat;
}
i.s-c {
  background-position: 0 -977px;
}

table {
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  border: none;
  width: 100%;
}

table td {
  padding: 6px 10px;
  line-height: 18px;
  text-align: left;
}

.w1 {
  width: 74px;
}

.hd {
  height: 18px;
  display: flex;
  justify-content: space-between;
}

.num {
  font-size: 12px;
  color: #999;
  width: 25px;
  margin-left: 5px;
}

.ply {
  display: block;
  width: 17px;
  height: 17px;
  cursor: pointer;
  background: url("../../assets/images/table.png") no-repeat;
  background-position: 0 -103px;
}

.dark td {
  background-color: #f7f7f7;
}

.column-2 {
  width: 100%;
  height: 18px;
  display: flex;
}

.column-2 a {
  display: block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-lists-name {
  display: block;
  height: 100%;
  line-height: 18px;
  text-decoration: none;
  font-size: 12px;
  color: #333;
}

.song-lists-name:hover {
  text-decoration: underline solid #333;
}
.lists-mv {
  display: block;
  width: 23px;
  height: 17px;
  margin: 1px 0 0 5px;
  background: url("../../assets/images/table.png") no-repeat;
  background-position: 0 -151px;
}

.w2-1 {
  width: 69px;
}

.song-time {
  font-size: 12px;
}

.menu-item-c {
  width: 82px;
  height: 100%;
  display: none;
}

tr:hover .menu-item-c {
  display: block;
}
tr:hover .song-time {
  display: none;
}

.menu-item-c:hover {
  display: block;
}

.w-4 {
  width: 20%;
}
.col-4 {
  width: 100%;
}
.col-4 a {
  display: block;
  width: 100%;
  text-decoration: none;
  font-size: 12px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.col-4 a:hover {
  text-decoration: underline solid #333;
}
.mvHide {
  display: none;
}

.subtit {
  display: none;
}
.sub {
  color: #aeaeae;
  font-size: 12px;
  margin-left: 2px;
}
.plyActie {
  background-position: -20px -128px !important;
}
</style>