<template>
  <div class="artistInfo">
    <div class="info-c">
      <div class="info-c-l">
        <div class="top-info">
          <div class="info-name">
            <h2>{{ artistInfo.name }}</h2>
            <!-- <h3>JJ Lin</h3> -->
          </div>
          <img :src="artistInfo.cover + '?param=640y300'" alt="" />
          <div class="mask"></div>
          <a href="javascript:;" class="btnfav" :class="{ has: false }">收藏</a>
        </div>
        <ul class="info-ul">
          <li>
            <router-link
              :to="'/home/artist/' + $route.params.id"
              exact
              href="javascript:;"
              :class="{ Iactive: src == 'hot' }"
            >
              <em @click="ckickItem" data-src="hot">热门作品</em>
            </router-link>
          </li>
          <li>
            <router-link
              :to="'/home/artist/' + $route.params.id + '/album'"
              exact
              href="javascript:;"
              :class="{ Iactive: src == 'album' }"
            >
              <em @click="ckickItem" data-src="album">所有专辑</em>
            </router-link>
          </li>
          <li>
            <router-link
              :to="'/home/artist/' + $route.params.id + '/mv'"
              exact
              href="javascript:;"
              :class="{ Iactive: src == 'mv' }"
            >
              <em @click="ckickItem" data-src="mv">相关MV</em>
            </router-link>
          </li>
          <li>
            <router-link
              :to="'/home/artist/' + $route.params.id + '/desc'"
              exact
              href="javascript:;"
              :class="{ Iactive: src == 'desc' }"
            >
              <em @click="ckickItem" data-src="desc">艺人介绍</em>
            </router-link>
          </li>
        </ul>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
      <div class="info-c-r">
        <div class="r-main-r-c">
          <h3 class="side-tit">相似歌手</h3>
          <ul class="song-item">
            <li v-for="(item, index) in simiArtists" :key="index">
              <div class="hd">
                <a
                  href="javascript:;"
                  :title="item.name"
                  @click="clickArt(item.id)"
                >
                  <img :src="item.img1v1Url + '?param=50y50'" alt="" />
                </a>
              </div>
              <p>
                <a
                  href="javascript:;"
                  :title="item.name"
                  @click="clickArt(item.id)"
                  s
                  >{{ item.name }}</a
                >
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistInfo, getSimiArtsits } from "@/network/artist";
export default {
  name: "Info",
  data() {
    return {
      src: "hot",
      id: null,
      artistInfo: {
        name: "",
      },
      simiArtists: [],
    };
  },
  created() {
    let { id } = this.$route.params;
    this.id = id;
    this.getArtistInfoMethod(id);
    this.getSimiArtistsMethod(id);
  },
  watch: {
    id(n) {
      this.getArtistInfoMethod(n);
      this.getSimiArtistsMethod(n);
    },
  },
  methods: {
    clickArt(id) {
      this.$router.push("/home/artist/" + id).then((res) => {
        this.getArtistInfoMethod(id);
        this.getSimiArtistsMethod(id);
      });
    },
    ckickItem(e) {
      let { src } = e.target.dataset;
      this.src = src;
    },

    getArtistInfoMethod(id) {
      getArtistInfo({
        id: id,
      })
        .then((res) => {
          this.artistInfo = res.data.data.artist;
          // console.log(res.data.data.artist);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getSimiArtistsMethod(id) {
      getSimiArtsits({
        id,
      })
        .then((res) => {
          this.simiArtists = res.data.artists;
          console.log(res.data.artists);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.artistInfo {
  background-color: #f5f5f5;
}
.info-c {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  border: 1px solid#d3d3d3;
  border-width: 0 1px;
  background: url("../../assets/images/wrap4.png") repeat-y;
  background-position: center 0;
  display: flex;
}

.info-c-l {
  flex: 1;
  padding: 47px 30px 40px 39px;
}

.top-info {
  margin-top: -20px;
  position: relative;
}

.info-name {
  display: flex;
}

.info-name h2 {
  max-width: 75%;
  height: 34px;
  line-height: 24px;
  font-weight: normal;
  font-size: 24px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  padding: 0;
  margin: 0;
}

.info-name h3 {
  max-width: 23%;
  padding: 0 0 0 10px;
  margin: 0;
  height: 34px;
  line-height: 32px;
  font-weight: normal;
  font-size: 14px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.top-info img,
.mask {
  display: block;
  width: 640px;
  height: 300px;
}

.mask {
  position: absolute;
  top: 34px;
  left: 0;
}

.btnfav {
  display: block;
  position: absolute;
  bottom: 18px;
  right: 20px;
  width: 76px;
  height: 32px;
  background: url("../../assets/images/iconall.png") no-repeat;
  background-position: 0 -500px;
  text-indent: -9999px;
}

.btnfav:hover {
  background-position: 0 -540px;
}

.btnfav.has {
  background-position: 0 -781px !important;
}

.info-ul {
  position: relative;
  top: -5px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  height: 39px;
  width: 638px;
  border: 1px solid#ccc;
  border-width: 0 1px;
  background: url("../../assets/images/tab.png") no-repeat;
  background-position: 0 0;
  background-repeat: repeat-x !important;
}

.info-ul li,
.info-ul li a {
  height: 39px;
  font-size: 14px;
}

.info-ul li a {
  display: block;
  text-decoration: none;
  padding: 0 0 0 2px;
  color: #333;
  background: url("../../assets/images/tab.png") no-repeat;
}

.info-ul li a.router-link-active {
  background-position: left -90px !important;
}

.info-ul li a em {
  display: block;
  font-style: normal;
  height: 37px;
  width: 134px;
  padding: 2px 2px 0 0;
  line-height: 37px;
  cursor: pointer;
  text-align: center;
}

.info-c-r {
  width: 270px;
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
  padding: 0;
  margin: 0 0 20px 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: -25px;
}

.song-item li {
  width: 50px;
  height: 92px;
  padding-left: 25px;
}
.hd {
  width: 50px;
  height: 50px;
}
.hd img {
  width: 50px;
  height: 50px;
}
.song-item p {
  margin-top: 7px;
  text-align: center;
}
.song-item p a {
  text-decoration: none;
  font-size: 12px;
  color: #333;
  display: block;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.song-item p a:hover {
  text-decoration: underline solid #333;
}
</style>