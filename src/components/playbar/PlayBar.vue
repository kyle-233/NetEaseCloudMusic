<template>
  <div class="playbar">
    <div class="p-b-c" @mouseup="handleBodyUp()" @mouseleave="handleBodyDown()">
      <div class="updn">
        <div class="left" @mouseup.stop="handleBodyUp()">
          <a
            href="javascript:;"
            @click.prevent.stop="handleLock()"
            :class="[lock ? 'lock' : 'nolock']"
            @mouseenter="handleEnter()"
          >
          </a>
        </div>
        <div class="right"></div>
      </div>
      <div class="bg"></div>
      <div class="upbar" @mouseenter="handleEnter()"></div>
      <div class="p-b-i-c">
        <div class="btns">
          <a href="javascript:;" class="bf-b b-f-1"></a>
          <a
            href="javascript:;"
            class="bf-b b-f-2"
            :class="[isPause ? 'pausing' : 'playing']"
            @click="turn()"
          ></a>
          <a href="javascript:;" class="bf-b b-f-3"></a>
        </div>
        <div class="pic" :class="[currentSongInfo.picUrl ? 'ishow' : 'ihide']">
          <img :src="currentSongInfo.picUrl" alt="" />
          <router-link :to="'/home/song/' + currentSongInfo.id"></router-link>
        </div>
        <div class="pic" :class="[currentSongInfo.picUrl ? 'ihide' : 'ishow']">
          <img src="../../assets/images/default_album.jpg" alt="" />
          <a href="javascript:;"></a>
        </div>
        <div class="play">
          <div class="words">
            <a
              @click="toSong(currentSongInfo.id)"
              href="javascript:void(0)"
              class="song-name"
              >{{ currentSongInfo.name }}</a
            >
            <a
              href="javascript:;"
              @click="toMV(currentSongInfo.mv)"
              class="mv"
              :class="[currentSongInfo.mv === 0 ? 'mvHide' : 'mvShow']"
            ></a>
            <span class="singer-c">
              <span title="">
                <a
                  href=""
                  v-for="(item, index) in currentSongInfo.artists"
                  :key="index"
                  >{{ item.name }} <span>/</span></a
                >
              </span>
            </span>
            <!-- <a href="" class="src"></a> -->
          </div>
          <div class="p-b-bar">
            <div class="p-b-bar-bg">
              <div class="next" :style="{ width: progressWidth }"></div>
              <div class="cur" :style="{ width: width }" ref="cur">
                <span class="btn" ref="button">
                  <i :class="[done ? 'hideBtn' : 'showBtn']"></i>
                </span>
              </div>
            </div>
            <span class="time">
              <em>{{ currentTime | formatCurrentTime }}</em
              >/{{
                Math.floor(currentSongInfo.duration / 1000) | formatCurrentTime
              }}
            </span>
          </div>
        </div>
        <div class="open">
          <a href="javascript:;" title="画中画歌词" class="h-z-h"></a>
          <a href="javascript:;" title="收藏" class="s-c"></a>
          <a href="javascript:;" title="分享" class="f-x"></a>
        </div>
        <div class="control">
          <div class="y-l" :class="[showYlBtn ? 'showYl' : 'hideYl']">
            <div class="bar-b-g"></div>
            <div class="vbg">
              <div class="curr" ref="ylBg" :style="{ height: height }"></div>
              <span
                class="bar-y-l-btn"
                ref="ylBtn"
                :style="{ bottom: bottom }"
              ></span>
            </div>
          </div>
          <a href="javascript:void(0)" @click="showYl" class="y-l-btn"></a>
          <a href="" class="m-s-btn"></a>
          <span class="f-pr">
            <a href="javascript:void(0)" @click="showList">{{
              musicPlayLists.length
            }}</a>
          </span>
        </div>
      </div>
      <div class="playList" :style="{ visibility: listHide }">
        <div class="playList-content">
          <div class="listhd">
            <div class="listhdc">
              <h4>播放列表({{ musicPlayLists.length }})</h4>
              <a href="javascript:;" class="fun addall">
                <span class="icon"></span>
                收藏全部
              </a>
              <span class="line"></span>
              <a href="javascript:;" class="fun clean">
                <span class="icon"></span>
                清除
              </a>
              <p class="songtitle">{{ currentSongInfo.name }}</p>
              <span class="close" @click="closeList">关闭</span>
            </div>
          </div>
          <div class="listbd">
            <div class="mask"></div>
            <div class="listbdc">
              <ul class="f-cb">
                <li
                  v-for="(item, index) in musicPlayLists"
                  :key="index"
                  @click="playListsSong(item.id)"
                  :class="[currentSongInfo.id === item.id ? 'light' : '']"
                >
                  <div class="col col-1">
                    <div
                      class="playing-icn"
                      :class="[currentSongInfo.id === item.id ? '' : 'hide']"
                    ></div>
                  </div>
                  <div class="col col-2">{{ item.name }}</div>
                  <div class="col col-3">
                    <div class="icns">
                      <i class="j-t ico ico-add">收藏</i>
                      <i class="ico ico-share">分享</i>
                      <i class="ico ico-dl">下载</i>
                      <i class="ico ico-del" @click.stop="deleteSong(item.id)"
                        >删除</i
                      >
                    </div>
                  </div>
                  <div class="col col-4">
                    <span>
                      <a
                        href="javascript:;"
                        v-for="(art, arti) in item.ar"
                        :key="arti"
                        >{{ art.name }}<span>/</span></a
                      >
                    </span>
                  </div>
                  <div class="col col-5">
                    {{ Math.floor(item.dt / 1000) | formatCurrentTime }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="bline"></div>
            <div class="mask2"></div>
            <div class="listlyric" ref="lyricDiv">
              <ul ref="lyric" style="transiform: 0.3s">
                <p
                  class="lyricp"
                  v-for="(item, index) in playlistLyric"
                  :key="index"
                  :class="{ acting: lyricIndex === index }"
                  :data-index="index"
                >
                  {{ item.lyric }}
                </p>
              </ul>
            </div>
            <div class="bline-2"></div>
          </div>
        </div>
      </div>
    </div>
    <audio
      :src="currentSongUrl"
      ref="audioDom"
      @timeupdate="handleDuration"
      @ended="handleEnded"
      @canplay="handleCanplay"
      @progress="handleProgress"
      @loadedmetadata="loaded"
    ></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSongUrl, getSongDetail } from "@/network/home";
import { getSongLyric } from "@/network/song";

export default {
  name: "PlayBar",
  props: {},
  data() {
    return {
      canPlay: false,
      // lock: false,
      time: null,
      song: null,
      audio: null,
      isPause: true,
      songdetail: "",
      currentTime: 0,
      duration: 0,
      progressTime: 0,
      picUrl: "",
      cur: null,
      button: null,
      curWidth: "",
      mouseDownWidth: 0,
      totalWidth: 466,
      totalHeight: 93,
      pre: 0,
      preY: 30,
      isDrag: false,
      ylBg: null,
      ylBtn: null,
      first: true,
      showYlBtn: false,
      done: true,
      listIfHide: true,
      musicPlayLists: [],
      playlistLyric: [],

      lyricIndex: 0,
      flagList: true,
      lyricDomArr: [],
      lyric: null,
      lyricDiv: null,
      scrollHeight: 0,
      lyricHeight: 0,
      Idx: 0,
    };
  },
  computed: {
    ...mapState({
      songId: (state) => state.songplay.songId,
      lock: (state) => state.songplay.lock,
      currentSongInfo: (state) => state.songplay.currentPlaySongInfo,
      currentSongUrl: (state) => state.songplay.currentSongUrl,
      playLists: (state) => state.songplay.playlistsId,
    }),

    listHide() {
      return this.listIfHide ? "hidden" : "visible";
    },
    // songId() {
    //   return this.$store.state.songplay.songId;
    // },
    // lock() {
    //   return this.$store.state.songplay.lock;
    // },

    progressWidth() {
      let num =
        (this.progressTime / this.currentSongInfo.duration) * 100000 || 0;
      return `${num}%`;
    },

    scale() {
      this.currentTime =
        ((this.pre - 0) / (this.totalWidth - 0)) *
        Math.floor(this.currentSongInfo.duration / 1000);

      return (this.pre - 0) / (this.totalWidth - 0);
    },

    width() {
      if (this.cur) {
        try {
          return this.totalWidth * this.scale + "px";
        } catch (e) {}
      } else {
        return 0 + "px";
      }
    },
    scaleY() {
      return (this.preY - 0) / (this.totalHeight - 0);
    },

    height() {
      if (this.ylBg) {
        try {
          return this.totalHeight * this.scaleY + "px";
        } catch (e) {}
      } else {
        return 0 + "px";
      }
    },
    bottom() {
      if (this.ylBg) {
        try {
          return this.totalHeight * this.scaleY - 6 + "px";
        } catch (e) {}
      } else {
        return 0 + "px";
      }
    },
  },
  created() {
    // this.getSongUrla(this.songId);
    // this.gerSongDetaila(this.songId);
    this.getPlaylists(this.playLists);
  },
  mounted() {
    this.lyric = this.$refs.lyric;
    this.lyricDiv = this.$refs.lyricDiv;
    this.lyricDomArr = this.lyric.querySelectorAll("p");
    this.lyricHeight = this.lyricDiv.offsetHeight / 2;

    let that = this;
    // this.$refs.audioDom.src = this.currentSongUrl;

    // 进度条控制
    this.cur = this.$refs.cur; //获取已经播放的进度条 Dom
    this.button = this.$refs.button; //获取进度条的轮子，可以移动的
    // 进度条的轮子，鼠标进入时
    // width为获取已经播放的进度条的宽度， that.width中的width为computed事件
    // startWith 为开始移动的位置
    this.button.onmousedown = function (e) {
      let width = parseInt(that.width);
      let startWith = e.clientX;
      // 鼠标开始移动
      // 现在的位置(e.clientX) - 开始的位置(startWith) + 原来的宽度(width) = 现在的位置
      // scale 取得现在位置的百分比，占总宽度
      // pre 记录现在的位置
      // pre有限制，(0~最大宽度)
      document.onmousemove = function (e) {
        let newWidth = e.clientX - startWith + width;
        let scale = newWidth / that.totalWidth;
        // 此处为 最大宽度减去最小宽度，乘以百分比，再加上最小宽度
        that.pre = Math.ceil((that.totalWidth - 0) * scale + 0);
        that.pre = Math.max(that.pre, 0);
        that.pre = Math.min(that.pre, that.totalWidth);
      };
      // 当鼠标松开的时候，就取消鼠标移动的事件，同时赋值给audio的currentTime
      document.onmouseup = function (e) {
        that.isDrag = false;
        document.onmousemove = null;
        document.onmouseup = null;
        that.$refs.audioDom.currentTime =
          ((that.pre - 0) / (that.totalWidth - 0)) *
          Math.floor(that.currentSongInfo.duration / 1000);
      };
      return false;
    };

    // 音量控制
    this.ylBg = this.$refs.ylBg;
    this.ylBtn = this.$refs.ylBtn;
    this.ylBtn.onmousedown = function (e) {
      let height = parseInt(that.height);
      let startHeight = e.clientY;
      document.onmousemove = function (e) {
        let temp = startHeight - e.clientY + height;
        let newHeight = temp;
        let scaleY = newHeight / that.totalHeight;
        that.preY = Math.ceil((that.totalHeight - 0) * scaleY + 0);
        that.preY = Math.max(that.preY, 0);
        that.preY = Math.min(that.preY, that.totalHeight);
        that.$refs.audioDom.volume = (that.preY - 0) / (that.totalHeight - 0);
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    };
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
  watch: {
    playlistLyric() {
      this.lyricDomArr = this.lyric.querySelectorAll("p");
    },
    "currentSongInfo.id": {
      handler() {
        this.getSongLyric(this.currentSongInfo.id);
        this.Idx = 0;
        this.flagList = true;
        this.scrollHeight = 0;
      },
    },
    playLists(n) {
      this.getPlaylists(n);
    },
    songId(n, o) {
      // this.$refs.audioDom.src = this.songId;
      // this.getSongUrla(n);
      // this.gerSongDetaila(n);
    },
    song(n, o) {
      let that = this;
    },
    currentTime(n) {
      this.pre =
        (Math.floor(n) / Math.floor(this.currentSongInfo.duration / 1000)) *
        this.totalWidth;
    },
    pre(n) {},
  },
  methods: {
    deleteSong(id) {
      this.$store.commit("deletePlayList", id);
    },
    handleLyricTransform(currentTime) {
      const item = this.playlistLyric[this.Idx];
      let time;
      try {
        time = item.time;
      } catch (e) {}
      if (this.flagList && currentTime > time) {
        this.lyricDomArr = this.lyric.querySelectorAll("p");
        const index = parseInt(this.lyricDomArr[this.Idx].dataset.index);
        if (this.Idx === index) {
          this.lyricIndex = this.Idx;
          this.Idx += 1;
          if (this.Idx >= this.lyricDomArr.length) {
            this.flagList = false;
            return;
          }

          this.scrollHeight += this.lyricDomArr[this.Idx].offsetHeight;
          // console.log(this.scrollHeight);
          if (this.lyric) {
            this.lyric.style.transform = `translateY(${
              this.lyricHeight - this.scrollHeight
            }px)`;
            // console.log(Number(this.lyricHeight) - Number(this.scrollHeight));
          }
        }
      }
    },

    async getSongLyric(id) {
      let { data: res } = await getSongLyric({
        id: id,
      });
      this.playlistLyric = this.formatMusicLyrics(res.lrc.lyric);
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

    playListsSong(id) {
      this.$store.dispatch("actionGetSongInfo", id);
      this.$store.dispatch("actionGetSongUrl", id);
    },
    getPlaylists(id) {
      if (id.length === 0) return;
      getSongDetail({ id: id.join() }).then((res) => {
        this.musicPlayLists = res.data.songs;
      });
    },
    closeList() {
      this.listIfHide = true;
    },
    showList() {
      this.listIfHide = !this.listIfHide;
    },
    loaded() {
      // this.play();
    },

    showYl() {
      this.showYlBtn = !this.showYlBtn;
    },
    toSong(id) {
      this.$router.push({
        path: `/home/song/${id}`,
      });
    },
    handleProgress(e) {
      let audio = this.$refs.audioDom;
      try {
        this.progressTime = audio.buffered.end(audio.buffered.length - 1);
      } catch (e) {}
    },
    handleCanplay() {
      this.done = true;
      if (!this.canPlay) {
        this.canPlay = true;
      } else {
        this.play();
      }
    },
    handleEnded() {
      this.isPause = true;
      this.$store.dispatch("actionAutoPlayMusic");
    },
    handleDuration(e) {
      const { currentTime } = e.target;
      if (!this.isDrag) {
        this.currentTime = currentTime;
      }
      this.handleLyricTransform(currentTime);
    },

    // 定义播放事件
    play() {
      this.$refs.audioDom.play();
      this.isPause = false;
    },

    // 定义暂停事件
    pause() {
      this.$refs.audioDom.pause();
      this.isPause = true;
    },

    // 暂停、播放按钮
    turn() {
      let that = this;
      if (this.isPause) {
        this.play();
      } else {
        this.pause();
      }
    },

    // 获取歌曲url id是song id
    // getSongUrla(id) {
    //   let that = this;
    //   if (id === "") return;
    //   getSongUrl({
    //     id: id,
    //   })
    //     .then((res) => {
    //       this.done = false;
    //       this.$refs.audioDom.src = res.data.data[0].url;
    //       // this.play();
    //       that.song = res.data.data[0];
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    // gerSongDetaila(id) {
    //   let that = this;
    //   if (id === "") return;
    //   getSongDetail({
    //     id: id,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       that.songdetail = res.data.songs[0];
    //       that.duration = res.data.songs[0].dt;
    //       that.picUrl = res.data.songs[0].al.picUrl;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    handleLock() {
      this.$store.commit("handlelock");
    },
    handleEnter() {
      this.$emit("up");
    },
    handleBodyUp() {
      clearTimeout(this.time);
      this.$emit("up");
      this.handleBodyDown();
    },
    handleBodyDown() {
      this.time = setTimeout(() => {
        this.$emit("down");
      }, 4000);
    },
  },
};
</script>

<style scoped>
.playbar {
  width: 100%;
}
.p-b-c {
  width: 100%;
  height: 53px;
  position: relative;
}
.bg {
  height: 53px;
  margin-right: 67px;
  background-image: url("../../assets/images/playbar.png");
  background-position: 0 0;
  background-repeat: repeat-x;
}
.updn {
  position: relative;
}
.left {
  position: absolute;
  top: -14px;
  right: 15px;
  width: 52px;
  height: 67px;
  background-image: url("../../assets/images/playbar.png");
  background-repeat: no-repeat;
  background-position: 0 -380px;
  z-index: 1000;
}
.left a {
  width: 18px;
  height: 18px;
  display: block;
  margin: 6px 0 0 17px;
  background-image: url("../../assets/images/playbar.png");
  background-repeat: no-repeat;
  z-index: 100;
}
.lock {
  background-position: -100px -380px;
}
.nolock {
  background-position: -80px -380px;
}
.right {
  position: absolute;
  top: -1px;
  right: 0;
  width: 15px;
  height: 54px;
  background-image: url("../../assets/images/playbar.png");
  background-repeat: no-repeat;
  background-position: -52px -393px;
}
.upbar {
  width: 100%;
  position: absolute;
  height: 20px;
  top: -10px;
  cursor: pointer;
}

.p-b-i-c {
  position: absolute;
  width: 980px;
  height: 47px;
  left: 50%;
  transform: translateX(-50%);
  top: 6px;
  display: flex;
}
.btns {
  width: 137px;
  padding: 6px 0 0 0;
  display: flex;
}
.bf-b {
  display: block;
  width: 28px;
  height: 28px;
  margin-right: 8px;
  background-image: url("../../assets/images/playbar.png");
  background-repeat: no-repeat;
}
.b-f-1 {
  background-position: 0 -130px;
  margin-top: 5px;
}
.b-f-2 {
  width: 36px;
  height: 36px;
}
.pausing {
  background-position: 0 -204px;
}
.playing {
  background-position: 0 -165px;
}
.b-f-3 {
  background-position: -80px -130px;
  margin-top: 5px;
}
.pic {
  width: 34px;
  height: 34px;
  margin-top: 6px;
  margin-right: 15px;
  position: relative;
}
.pic img {
  width: 100%;
  height: 100%;
}
.pic a {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.play {
  width: 581px;
}
.words {
  height: 28px;
  overflow: hidden;
  color: #e8e8e8;
  text-shadow: 0 1px 0 #171717;
  line-height: 28px;
  display: flex;
}

.song-name {
  text-decoration: none;
  max-width: 300px;
  font-size: 12px;
  color: #e8e8e8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.song-name:hover {
  text-decoration: underline #e8e8e8;
}

.singer-c {
  max-width: 220px;
  margin-left: 15px;
  color: #9b9b9b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.singer-c span {
  color: #9b9b9b;
  font-size: 12px;
}

.singer-c span a {
  text-decoration: none;
  color: #9b9b9b;
  font-size: 12px;
}

.singer-c span a:last-child span {
  visibility: hidden;
}

.singer-c span a:hover {
  text-decoration: underline #9b9b9b solid;
}

.src {
  display: block;
  width: 14px;
  height: 15px;
  margin: 8px 0 0 13px;
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: -110px -103px;
}

.p-b-bar {
  width: 466px;
  position: relative;
}
.p-b-bar-bg {
  position: relative;
  width: 466px;
  height: 9px;
  background-image: url("../../assets/images/statbar.png");
  background-repeat: no-repeat;
  background-position: right 0;
}
.next {
  height: 9px;
  background: url("../../assets/images/statbar.png") no-repeat 0 9999px;
  background-position: right -30px;
  transition: width 0.5s ease-in-out;
  overflow: hidden;
}
.cur {
  position: absolute;
  /* width: 20px; */
  /* transition: width 2s ease; */
  height: 9px;
  top: 0;
  left: 0;
  background: url("../../assets/images/statbar.png") no-repeat 0 9999px;
  background-position: left -66px;
}
.cur .btn {
  position: absolute;
  top: -7px;
  right: -13px;
  margin-left: -11px;
  width: 22px;
  height: 24px;
  background: url("../../assets/images/iconall.png") no-repeat;
  background-position: 0 -250px;
}

.cur .btn:hover {
  background-position: 0 -280px;
}

.cur .btn i {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 12px;
  height: 12px;
  background: url("../../assets/images/loading.gif");
}
.time {
  position: absolute;
  top: -6px;
  right: -84px;
  color: #797979;
  text-shadow: 0 1px 0 #121212;
  font-size: 12px;
}

.time em {
  font-style: normal;
}

.open {
  width: 87px;
  display: flex;
}

.open a {
  width: 25px;
  height: 25px;
  margin: 11px 2px 0 0;
  display: block;
  background-image: url("../../assets/images/playbar.png");
  background-repeat: no-repeat;
}

.s-c {
  background-position: -88px -163px;
}
.s-c:hover {
  background-position: -88px -189px;
}

.f-x {
  background-position: -114px -163px;
}
.f-x:hover {
  background-position: -114px -189px;
}
.control {
  position: relative;
  z-index: 10;
  width: 113px;
  padding-left: 13px;
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: -147px -238px;
  display: flex;
}
.y-l {
  position: absolute;
  top: -113px;
  left: 9px;
  clear: both;
  width: 32px;
  height: 113px;
  /* visibility: hidden; */
}
.showYl {
  visibility: visible;
}
.hideYl {
  visibility: hidden;
}
.bar-b-g {
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 113px;
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: 0 -503px;
}
.vbg {
  padding: 4px 0;
  top: 7px;
  position: absolute;
  left: 14px;
  width: 4px;
  height: 93px;
}
.curr {
  top: auto;
  bottom: 4px;
  left: 0;
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: -40px bottom;
  overflow: hidden;
  /* height: 20px; */
  position: absolute;
  width: 4px;
}

.bar-y-l-btn {
  position: absolute;
  left: -7px;
  display: block;
  width: 18px;
  height: 20px;
  background: url("../../assets/images/iconall.png") no-repeat;
  background-position: -40px -250px;
  cursor: pointer;
  /* top: 30px; */
  bottom: 0;
}

.y-l-btn {
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: -2px -248px;
  width: 25px;
  height: 25px;
  margin: 11px 2px 0 0;
  text-indent: -9999px;
}

.y-l-btn:hover {
  background-position: -31px -248px;
}

.m-s-btn {
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: -3px -344px;
  width: 25px;
  height: 25px;
  margin: 11px 2px 0 0;
  text-indent: -9999px;
}

.m-s-btn:hover {
  background-position: -33px -344px;
}

.ishow {
  display: block;
}
.showBtn {
  visibility: visible;
}

.ihide {
  display: none;
}
.hideBtn {
  visibility: hidden;
}

.f-pr {
  width: 59px;
  height: 36px;
  position: relative;
}

.f-pr a {
  display: block;
  width: 38px;
  height: 25px;
  padding-left: 21px;
  background: url("../../assets/images/playbar.png") no-repeat 0 9999px;
  background-position: -42px -68px;
  line-height: 27px;
  text-align: center;
  color: #666;
  text-shadow: 0 1px 0 #080707;
  text-indent: 0;
  text-decoration: none;
  margin: 11px 2px 0 0;
  font-size: 12px;
}

.playList {
  width: 986px;
  height: 301px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 47px;
}

.playList-content {
  position: relative;
}

.listhd {
  height: 41px;
  background: url("../../assets/images/playlist_bg.png");
  background-position: 0 0;
  padding: 0 5px;
}

.listhdc {
  position: relative;
}

.listhdc h4 {
  padding: 0;
  margin: 0;
  position: absolute;
  left: 25px;
  top: 0;
  height: 39px;
  line-height: 39px;
  font-size: 14px;
  color: #e2e2e2;
}

.fun {
  position: absolute;
  top: 12px;
  height: 15px;
  line-height: 15px;
  cursor: pointer;
  color: #ccc;
  display: flex;
  text-decoration: none;
  font-size: 12px;
}

.addall {
  left: 398px;
}

.addall:hover,
.clean:hover {
  color: #e2e2e2;
}

.addall:hover .icon {
  background-position: -24px -20px;
}

.fun .icon {
  margin: 1px 6px 0 0;
  width: 16px;
  height: 16px;
  background: url("../../assets/images/playlist.png") no-repeat 0 9999px;
}

.addall .icon {
  background-position: -24px 0;
}

.line {
  position: absolute;
  top: 13px;
  left: 477px;
  height: 15px;
  border-left: 1px solid #000;
  border-right: 1px solid #2c2c2c;
}
.clean {
  left: 490px;
}
.clean:hover .icon {
  background-position: -51px -20px;
}
.clean .icon {
  width: 13px;
  background-position: -51px 0;
}
.songtitle {
  position: absolute;
  left: 595px;
  top: 0;
  width: 346px;
  text-align: center;
  height: 39px;
  line-height: 39px;
  color: #fff;
  font-style: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  padding: 0;
  margin: 0;
}

.close {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  text-indent: -999px;
  cursor: pointer;
  background: url("../../assets/images/playlist.png");
  background-position: -195px 9px;
}
.close:hover {
  background-position: -195px -21px;
}

.listbd {
  position: absolute;
  left: 0;
  top: 41px;
  height: 260px;
  width: 976px;
  overflow: hidden;
  background: url("../../assets/images/playlist_bg.png");
  background-repeat: repeat-y;
  background-position: -1014px 0;
  padding: 0 5px;
}
.mask {
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 2;
  width: 558px;
  height: 260px;
  background-color: #121212;
  opacity: 0.5;
}
.listbdc {
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 4;
  height: 260px;
  width: 553px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 6px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: none;
  background: #868686;
  border: 1px solid #a6a6a6;
  opacity: 0.8;
  -webkit-box-shadow: none;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  border-radius: 5px;
  background: #000;
  -webkit-box-shadow: none;
}

.bline {
  position: absolute;
  left: 555px;
  top: -1px;
  z-index: 2;
  width: 6px;
  height: 260px;
  background: #000;
  opacity: 0.5;
}
.mask2 {
  position: absolute;
  left: 560px;
  top: 0;
  z-index: 3;
  width: 420px;
  height: 250px;
  background-color: #121212;
  opacity: 0.01;
}
.listlyric {
  position: absolute;
  right: 40px;
  top: 0;
  z-index: 4;
  margin: 21px 0 20px 0;
  height: 219px;
  width: 354px;
  overflow-y: auto;
}
.listlyric ul {
  padding: 0;
  margin: 0;
}
.listlyric p {
  color: #989898;
  text-align: center;
  line-height: 32px;
  min-height: 32px;
  word-wrap: break-word;
  padding: 0;
  margin: 0;
  font-size: 12px;
}
.bline-2 {
  position: absolute;
  left: auto;
  right: 2px;
  top: -1px;
  z-index: 2;
  width: 6px;
  height: 260px;
  background: #000;
  opacity: 0.5;
}

.f-cb {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  color: #ccc;
}

.f-cb li {
  width: 100%;
  display: flex;
}

.f-cb li.light .col-2,
.f-cb li.light .col-4 span a,
.f-cb li.light .col-5 {
  color: #fff;
}

.col {
  padding-left: 10px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  cursor: pointer;
  font-size: 12px;
}
.col-2,
.col-4 {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.col-1 {
  width: 10px;
}

.playing-icn {
  margin-top: 8px;
  width: 10px;
  height: 13px;
  background: url("../../assets/images/playlist.png") no-repeat 0 9999px;
  background-position: -182px 0;
}

.playing-icn.hide {
  visibility: hidden;
}

.col-2 {
  width: 256px;
}

.col-3 {
  visibility: hidden;
  width: 80px;
  position: relative;
}

.icns {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 23px;
  display: flex;
}

.ico {
  height: 16px;
  overflow: hidden;
  margin: 7px 0 0 10px;
  background: url("../../assets/images/playlist.png") no-repeat 0 9999px;
  text-indent: -9999px;
}

.ico-del {
  width: 13px;
  background-position: -51px 0;
}
.ico-del:hover {
  background-position: -51px -20px;
}
.ico-dl {
  width: 14px;
  background-position: -57px -50px;
}

.ico-dl:hover {
  background-position: -80px -50px;
}
.ico-share {
  width: 14px;
  background-position: 0 0;
}

.ico-share:hover {
  background-position: 0 -20px;
}

.ico-add {
  width: 16px;
  background-position: -24px 0;
}

.ico-add:hover {
  background-position: -24px -20px;
}

.col-4 {
  width: 100px;
}

.col-4 a {
  text-decoration: none;
  color: #9b9b9b;
}

.col-4 a:last-child span {
  display: none;
}

.col-4 a:hover {
  text-decoration: underline #fff solid;
}

.col-5 {
  width: 35px;
  color: #666;
  margin-left: 10px;
}

.f-cb li:hover .col-2,
.f-cb li:hover .col-4 a,
.f-cb li:hover .col-5 {
  color: #fff;
}

.f-cb li:hover .col-3 {
  visibility: visible;
}

.mv {
  width: 19px;
  height: 17px;
  margin: 6px 0 0 3px;
  background: url("../../assets/images/playbar.png") no-repeat;
  background-position: 0 -57px;
}

.mvHide {
  display: none;
}

.mvShow {
  display: block;
}
.acting {
  color: #fff !important;
  font-size: 14px !important;
}
</style>