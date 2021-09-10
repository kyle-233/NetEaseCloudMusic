<template>
  <div class="recommend">
    <Rotation :lists="imgLists" />
    <div class="r-main-content">
      <div class="r-main">
        <div class="r-main-l">
          <div class="r-m-l-nav">
            <r-nav-bar title="热门推荐" :typelists="type"></r-nav-bar>
          </div>
          <div class="r-m-l-content-1">
            <r-main-one :lists="playLists"></r-main-one>
          </div>
          <div class="r-m-l-t">
            <r-nav-bar title="新碟上架"></r-nav-bar>
          </div>
          <div class="r-m-l-content-2">
            <r-main-two :newlists="newAlbumLists"></r-main-two>
          </div>
          <div class="r-m-l-t">
            <r-nav-bar title="榜单"></r-nav-bar>
          </div>
          <div class="r-m-l-content-3">
            <r-main-three :toplists="topList"></r-main-three>
          </div>
        </div>
        <div class="r-main-r">
          <div class="user-profile-c">
            <div class="user-info">
              <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
              <a href="javascript:;">用户登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rotation from "@/components/rotation/Rotation2.vue";
import RNavBar from "./components/RNavBar.vue";
import RMainOne from "./components/RMainOne.vue";
import RMainTwo from "./components/RMainTwo.vue";
import RMainThree from "./components/RMainThree.vue";

import {
  getbanners,
  getplaylist,
  getnewalbum,
  gettoplist,
  gettoplistEach,
} from "@/network/recommend";

export default {
  name: "Recommend",
  components: {
    Rotation,
    RNavBar,
    RMainOne,
    RMainTwo,
    RMainThree,
  },
  data() {
    return {
      imgLists: [],
      playLists: [],
      newAlbumLists: [],
      topList: [],
      type: [
        {
          label: "华语",
        },
        {
          label: "流行",
        },
        {
          label: "摇滚",
        },
        {
          label: "民谣",
        },
        {
          label: "电子",
        },
      ],
    };
  },
  created() {
    getbanners()
      .then((res) => {
        this.imgLists = res.data.banners;
      })
      .catch((err) => {
        console.log(err);
      });

    getplaylist({
      limit: 8,
    })
      .then((res) => {
        this.playLists = res.data.playlists;
      })
      .catch((err) => {
        console.log(err);
      });

    getnewalbum({
      limit: 10,
    })
      .then((res) => {
        const { weekData, monthData } = res.data;
        this.newAlbumLists = weekData.length > 10 ? weekData : monthData;
      })
      .catch((err) => {
        console.log(err);
      });
    this.gettoplists();
  },
  methods: {
    getHotlist(id) {
      return gettoplistEach({
        id: id,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    gettoplists() {
      let that = this;
      gettoplist()
        .then(function (res) {
          // console.log(res.data);
          for (let i = 0; i < 3; i++) {
            that
              .getHotlist(res.data.list[i].id)
              .then((r) => {
                res.data.list[i].addlists = r.data.playlist.tracks.slice(0, 10);

                return res.data.list[i];
              })
              .then((r2) => {
                that.topList.push(r2);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  overflow: hidden;
}

.r-main-l {
  float: left;
  width: 729px;
  padding: 20px 20px 40px;
  box-sizing: border-box;
  border-right: 1px solid #d3d3d3;
}

.r-main-r {
  float: right;
  width: 250px;
  position: relative;
  right: 1px;
}

.r-m-l-nav,
.r-m-l-t {
  border-bottom: 2px solid #c10d0c;
}
.r-m-l-content-2 {
  margin: 20px 0 37px;
}
.r-m-l-content-3 {
  margin-top: 20px;
}

.user-profile-c {
}

.user-info {
  height: 126px;
  padding-top: 0;
  background: url("../../assets/images/index.png") no-repeat 0 9999px;
  background-position: 0 0;
}

.user-info p {
  width: 205px;
  margin: 0 auto;
  padding: 16px 0;
  line-height: 22px;
  font-size: 12px;
  color: #666;
}

.user-info a {
  font-size: 12px;
  text-decoration: none;
  margin: 0 auto;
  display: block;
  width: 100px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 0 #8a060b;
  background: url("../../assets/images/index.png") no-repeat 0 9999px;
  background-position: 0 -195px;
}
</style>