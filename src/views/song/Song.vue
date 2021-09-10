<template>
  <div class="song">
    <sub-nav-bar :subLists="subLists"></sub-nav-bar>
    <div class="r-main-content">
      <div class="r-main">
        <div class="r-main-l">
          <div class="r-m-l-c">
            <div class="r-m-l clearfix">
              <div class="song-i-c">
                <div class="song-i-c">
                  <img :src="currentSongInfo.picUrl" alt="" />
                  <span></span>
                </div>
              </div>
              <div class="s-d-d">
                <div class="s-d-n">
                  <i></i>
                  <div class="title">
                    <em>{{ currentSongInfo.name }}</em>
                    <a
                      :class="[currentSongInfo.mv ? 'show' : 'hide']"
                      href="javascript:;"
                      title="播放mv"
                      class="playMv"
                    >
                      <i></i>
                    </a>
                    <div
                      class="subTitle"
                      :class="[
                        currentSongInfo.alia.length ? 'showBlock' : 'hide',
                      ]"
                    >
                      {{ currentSongInfo.alia[0] }}
                    </div>
                  </div>
                </div>
                <div class="s-d-a">
                  <p>
                    歌手:
                    <span>
                      <a
                        class="artistsLink"
                        href="javascript:;"
                        v-for="(art, i) in currentSongInfo.artists"
                        :key="i"
                        >{{ art.name }}
                        <span>/ </span>
                      </a>
                    </span>
                  </p>
                </div>
                <div class="s-d-z">
                  <p>
                    所属专辑:
                    <a href="javascript:;">{{ currentSongInfo.al.name }}</a>
                  </p>
                </div>
                <div class="s-d-o">
                  <div class="c-p">
                    <a href="" class="play">
                      <i>
                        <em class="ply"></em>
                        播放
                      </i>
                    </a>
                    <a href="" class="addto"></a>

                    <a href="" class="other">
                      <i class="s-c">收藏</i>
                    </a>
                    <a href="" class="other">
                      <i class="f-x">分享</i>
                    </a>
                    <a href="" class="other">
                      <i class="x-z">下载</i>
                    </a>
                    <a href="" class="other">
                      <i class="p-l">(123)</i>
                    </a>
                  </div>
                </div>
                <div class="s-d-l" :style="{ height: lyricViewHeight }">
                  <lyric-view :lyric="songLyric"></lyric-view>
                </div>
                <div class="control">
                  <a href="javascript:;" @click="open">{{
                    isOpen ? "收起" : "展开"
                  }}</a>
                </div>
              </div>
            </div>
            <div class="comment-content">
              <Comment />
            </div>
          </div>
        </div>
        <div class="r-main-r">
          <div class="r-main-r-c">
            <h3 class="side-tit">相似歌曲</h3>
            <ul class="song-item">
              <li v-for="(item, index) in simiSong" :key="index">
                <div class="song-info">
                  <a href="javascript:;" class="song-name" :data-id="item.id">{{
                    item.name
                  }}</a>
                  <div class="singer-c">
                    <a
                      href="javascript:;"
                      class="singer"
                      v-for="(artists, num) in item.artists"
                      :key="num"
                      :data-artId="artists.id"
                      >{{ artists.name }}<span>/</span></a
                    >
                  </div>
                </div>
                <div class="side-control">
                  <a
                    href="javascript:;"
                    class="side-play"
                    @click="playSong(item.id)"
                    title="播放"
                  ></a>
                  <a
                    href="javascript:;"
                    class="side-add"
                    title="添加到播放列表"
                    @click="addSong(item.id)"
                  ></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubNavBar from "@/components/subnavbar/SubNavBar.vue";
import Comment from "@/components/comment/comment.vue";
import LyricView from "./components/LyricView.vue";
import { getSongLyric, getSimiSong } from "@/network/song.js";
import { mapState } from "vuex";

export default {
  name: "Song",
  components: {
    SubNavBar,
    LyricView,
    Comment,
  },
  computed: {
    ...mapState({
      songId: (state) => state.songplay.songId,
      currentSongInfo: (state) => state.songplay.currentPlaySongInfo,
    }),
    lyricViewHeight() {
      return this.isOpen ? "auto" : "320px";
    },
  },
  data() {
    return {
      songLyric: null,

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
      isOpen: false,
      simiSong: [],
    };
  },
  watch: {
    songId(n, o) {
      // this.getSongLyrica(n);
    },
    "currentSongInfo.id": {
      handler(n) {
        this.getSongLyrica(n);
        this.getSimiSonga(n);
      },
    },
  },
  created() {
    this.getSongLyrica(this.currentSongInfo.id);
    this.getSimiSonga(this.currentSongInfo.id);
    if (this.songId) this.getSongLyrica(this.songId);
  },
  methods: {
    addSong(id) {
      this.$store.commit("mutationSetPlayLists", id);
    },
    playSong(id) {
      this.$store.commit("getId", id);
      this.$store.commit("mutationSetPlayLists", id);
      this.$store.dispatch("actionGetSongInfo", id);
      this.$store.dispatch("actionGetSongUrl", id);
    },
    getSimiSonga(id) {
      getSimiSong({
        id: id,
      })
        .then((res) => {
          console.log(res);
          this.simiSong = res.data.songs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open() {
      this.isOpen = !this.isOpen;
    },
    getSongLyrica(id) {
      let that = this;
      getSongLyric({
        id: id,
      })
        .then((res) => {
          console.log(res);
          // this.songLyric = res.data.lrc.lyric;
          this.songLyric = that.formatMusicLyrics(res.data.lrc.lyric);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatMusicLyrics(lyric) {
      let resLyric = [];
      if (lyric === "")
        return { time: 0, lyric: "这个地方没有歌词", uid: 520520 };
      const lineLyric = lyric.split(/\n/);

      const regTime = /\d{2}:\d{2}.\d{2,3}/;

      for (let i = 0; i < lineLyric.length; i++) {
        if (lineLyric[i] === "") continue;
        const time = this.formatLyricTime(lineLyric[i].match(regTime)[0]);
        // console.log(lineLyric[i].split("]")[1]);

        if (lineLyric[i].split("]")[1] !== "") {
          resLyric.push({
            time: time,
            lyric: lineLyric[i].split("]")[1],
            uid: parseInt(Math.random().toString().slice(-6)),
          });
        }
      }
      return resLyric;
    },

    formatLyricTime(time) {
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;

      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
  },
};
</script>


<style scoped>
.r-main-content {
  background-color: #f2f2f2;
}
.r-main {
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  background-color: #fff;
  display: flex;
}

.r-main-l {
  width: 729px;
  min-width: 729px;
  box-sizing: border-box;
  border-right: 1px solid #d3d3d3;
}

.r-main-r {
  flex: 1;
  position: relative;
}

.r-m-l-c {
  padding: 47px 30px 40px 39px;
}

.r-m-l {
  margin-top: -10px;
  height: auto;
}
.song-i-c {
  width: 206px;
  position: relative;
  float: left;
  margin-right: -226px;
}

.song-i-c {
  position: relative;
  width: 198px;
  height: 198px;
}

.song-i-c img {
  display: block;
  width: 130px;
  height: 130px;
  margin: 34px;
}

.song-i-c span {
  display: block;
  width: 206px;
  height: 205px;
  position: absolute;
  top: -4px;
  left: -4px;
  background: url("../../assets/images/coverall.png") no-repeat;
  background-position: -140px -580px;
}

.clearfix::after {
  content: "";
  display: block;
  height: 0;
  width: 0;
  visibility: hidden;
  clear: both;
}

.s-d-d {
  width: 414px;
  float: right;
}

.title {
  /* margin-left: 64px; */
  position: relative;
  top: -6px;
  font-size: 24px;
}

.title em {
  font-style: normal;
}

.subTitle {
  font-size: 14px;
  color: #bababa;
  margin: 1px 0 5px;
}

.s-d-a p,
.s-d-z p {
  margin: 10px 0;
  font-size: 12px;
}

.s-d-a p a,
.s-d-z p a {
  text-decoration: none;
  color: #0c73c2;
}

.s-d-a p a:hover,
.s-d-z p a:hover {
  text-decoration: underline #0c73c2 solid;
}
.c-p {
  margin-bottom: 25px;
  margin-right: -10px;
  display: flex;
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
i.f-x {
  background-position: 0 -1225px;
}
i.x-z {
  background-position: 0 -2761px;
}
i.p-l {
  background-position: 0 -1465px;
}

.s-d-l {
  margin-top: 13px;
  overflow: hidden;
}

.control a {
  text-decoration: none;
  font-size: 12px;
  color: #0c73c2;
}

.control a:hover {
  text-decoration: underline #0c73c2 solid;
}

.comment-content {
  margin-top: 100px;
}

.artistsLink:last-child span {
  display: none;
}

.playMv {
  display: inline-block;
  width: 21px;
  height: 18px;
  margin-left: 8px;
}

.playMv i {
  display: block;
  width: 21px;
  height: 18px;
  background: url("../../assets/images/icon.png");
  background-position: 0 -18px;
  overflow: hidden;
}

.show {
  display: inline-block;
}

.showBlock {
  display: block;
}

.hide {
  display: none;
}

.r-main-r-c {
  padding: 20px 40px 40px 30px;
}

.side-tit {
  padding: 0;
  font-size: 12px;
  height: 23px;
  margin: 0 0 20px 0;
  border-bottom: 1px solid #ccc;
  color: #000;
}

.song-item {
  width: 183px;
  padding: 0;
  margin: 0 0 20px 0;
  list-style: none;
}

.song-item li {
  padding: 0;
  margin: 10px 0 0 0;
  display: flex;
}
.song-info {
  max-width: 148px;
  flex: 1;
  font-size: 12px;
  line-height: 16px;
}
.song-info a {
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.song-name {
  width: 80%;
  color: #000;
  display: block;
}
.song-name:hover {
  text-decoration: underline solid #000;
}
.singer-c {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.singer {
  color: #999;
  display: inline-block;
}

.singer:last-child span {
  display: none;
}

.singer span {
  margin: 0 1px;
  display: inline-block;
}

.singer:hover {
  text-decoration: underline solid #999;
}

.side-control {
  line-height: 32px;
  display: flex;
  align-items: center;
}

.side-control a {
  width: 10px;
  height: 11px;
  display: block;
  background: url("../../assets/images/icon2.png") no-repeat -9999px -9999px;
}

.side-play {
  background-position: -69px -455px !important;
  margin-right: 16px;
}

.side-add {
  background-position: -87px -454px !important;
}
</style>