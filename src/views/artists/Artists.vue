<template>
  <div class="artists">
    <div class="art-c">
      <div class="art-l">
        <div class="art-l-c">
          <h2 class="tit-1">推荐</h2>
          <ul class="tit-1-list">
            <li>
              <a
                href="javascript:;"
                :class="[currentId == 't-1' ? 'active' : 'noActive']"
                data-id="t-1"
                data-title="热门歌手"
                @click="changeItem"
                >推荐歌手</a
              >
            </li>
            <!-- <li>
              <a
                href="javascript:;"
                :class="[currentId == 't-2' ? 'active' : 'noActive']"
                @click="changeItem"
                data-id="t-2"
                >入驻歌手</a
              >
            </li> -->
          </ul>

          <div class="fli" v-for="(item, index) in lists" :key="index">
            <h2 class="tit-1">{{ item.title }}</h2>
            <ul class="tit-1-list">
              <li v-for="sub in item.children" :key="sub.id">
                <a
                  :data-area="item.title"
                  :data-type="sub.type"
                  :data-title="sub.name"
                  href="javascript:;"
                  :class="[currentId == sub.id ? 'active' : 'noActive']"
                  :data-id="sub.id"
                  @click="changeItem"
                  >{{ sub.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="art-r">
        <div class="art-r-c">
          <div class="title-2">
            <h3>
              <span>{{ title }}</span>
            </h3>
          </div>
          <Index
            :class="{ indexHide: currentId == 't-1' }"
            @indexChange="getIndexArtists"
          />
          <div class="r-content">
            <ul class="r-c-ul">
              <li
                class="r-c-li"
                v-for="(item, index) in showLists"
                :key="index"
              >
                <div class="cover">
                  <img :src="item.img1v1Url" alt="" />
                  <router-link
                    :to="'/home/artist/' + item.id"
                    href="javascript:;"
                    :title="item.name + '的音乐'"
                  ></router-link>
                </div>
                <p class="singer-name">
                  <router-link
                    :to="'/home/artist/' + item.id"
                    href="javascript:;"
                    :title="item.name + '的音乐'"
                    >{{ item.name }}</router-link
                  >
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotArtists, getArtists } from "@/network/artist.js";

import Index from "./components/index";

export default {
  name: "Artists",
  components: {
    Index,
  },
  data() {
    return {
      currentId: "t-1",
      title: "热门歌手",
      // hotArtistsLists: [],
      showLists: [],
      area: null,
      type: null,
      lists: [
        {
          title: "华语",
          children: [
            {
              id: "h-1",
              name: "华语男歌手",
              type: 1,
            },
            {
              id: "h-2",
              name: "华语女歌手",
              type: 2,
            },
            {
              id: "h-3",
              name: "华语歌手/乐队",
              type: 3,
            },
          ],
        },
        {
          title: "欧美",
          children: [
            {
              id: "o-1",
              name: "欧美男歌手",
              type: 1,
            },
            {
              id: "o-2",
              name: "欧美女歌手",
              type: 2,
            },
            {
              id: "o-3",
              name: "欧美歌手/乐队",
              type: 3,
            },
          ],
        },
        {
          title: "日本",
          children: [
            {
              id: "r-1",
              name: "日本男歌手",
              type: 1,
            },
            {
              id: "r-2",
              name: "日本女歌手",
              type: 2,
            },
            {
              id: "r-3",
              name: "日本歌手/乐队",
              type: 3,
            },
          ],
        },
        {
          title: "韩国",
          children: [
            {
              id: "k-1",
              name: "韩国男歌手",
              type: 1,
            },
            {
              id: "k-2",
              name: "韩国女歌手",
              type: 2,
            },
            {
              id: "k-3",
              name: "韩国歌手/乐队",
              type: 3,
            },
          ],
        },
        {
          title: "其他",
          children: [
            {
              id: "q-1",
              name: "其他男歌手",
              type: 1,
            },
            {
              id: "q-2",
              name: "其他女歌手",
              type: 2,
            },
            {
              id: "q-3",
              name: "其他歌手/乐队",
              type: 3,
            },
          ],
        },
      ],
    };
  },
  created() {
    this.getHotArtistsMethod();
  },
  methods: {
    getIndexArtists(letter) {
      let index;
      if (letter === "热门") {
        index = -1;
      } else if (letter === "其他") {
        index = 0;
      } else {
        index = letter.toLowerCase();
      }
      this.getArtistsMethod(this.type, this.area, index);
    },
    changeItem(e) {
      let { area, type, id, title } = e.target.dataset;
      this.currentId = id;
      let subarea;
      switch (area) {
        case "华语":
          subarea = 7;
          break;
        case "欧美":
          subarea = 96;
          break;
        case "日本":
          subarea = 8;
          break;
        case "韩国":
          subarea = 16;
          break;
        case "其他":
          subarea = 0;
          break;
        default:
          subarea = -1;
      }
      this.area = subarea;
      this.type = type;
      this.title = title;
      if (id === "t-1") {
        this.getHotArtistsMethod();
      } else {
        this.getArtistsMethod(type, subarea);
      }
    },
    getHotArtistsMethod() {
      getHotArtists()
        .then((res) => {
          this.showLists = res.data.artists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArtistsMethod(type, area, initial = -1, limit = 100) {
      getArtists({
        type,
        area,
        initial,
        limit,
      })
        .then((res) => {
          this.showLists = res.data.artists;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.artists {
  background-color: #f5f5f5;
  font-size: 12px;
  color: #333;
}
.art-c {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background: url("../../assets/images/wrap2.png") repeat-y center 0;
  border: 1px solid#d3d3d3;
  border-width: 0 1px;
  display: flex;
}

.art-l {
  position: relative;
  width: 180px;
}

.art-r {
  float: right;
  flex: 1;
  /* width: 100%; */
  margin-left: 2px;
}

.art-l-c {
  padding: 0 10px 40px;
  margin-top: 51px;
}

.tit-1 {
  height: 25px;
  margin: 0;
  padding-left: 14px;
  font-size: 16px;
  font-family: "Microsoft Yahei";
}

.tit-1-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tit-1-list li {
  margin-bottom: 2px;
  width: 160px;
  height: 30px;
  line-height: 30px;
}

.tit-1-list li a {
  display: block;
  text-decoration: none;
  width: 133px;
  line-height: 30px;
  padding-left: 27px;
  color: #333;
  background: url("../../assets/images/singer.png") no-repeat 0 9999px;
  background-position: 0 -30px;
}

.active {
  color: #c20c0c !important;
  background-position: 0 0 !important;
}

.noActive:hover {
  text-decoration: underline solid #333;
}

.active:hover {
  text-decoration: none;
}

.fli {
  margin: 5px 0 0;
  padding-top: 16px;
  border-top: 1px solid#d3d3d3;
}
.art-r-c {
  padding: 40px;
}
.title-2 {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c20c0c;
}
.title-2 h3 {
  margin: 0;
  font-size: 24px;
  font-weight: normal;
}
.title-2 a {
  margin-top: 14px;
  text-decoration: none;
  color: #666;
}
.title-2 a:hover {
  text-decoration: underline solid #666;
}
.r-content {
  width: 100%;
}

.r-c-ul {
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0 0 0;
  padding: 0;
}
.r-c-li {
  width: 130px;
  height: 154px;
  padding-bottom: 30px;
}
.cover {
  width: 130px;
  height: 130px;
  position: relative;
}
.cover img {
  display: block;
  width: 100%;
  height: 100%;
}
.cover a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/coverall.png") no-repeat;
  background-position: 0 -680px;
}
.singer-name {
  margin: 8px 0 0 0;
}
.singer-name a {
  text-decoration: none;
  color: #000;
}
.singer-name a:hover {
  text-decoration: underline solid #000;
}
.indexHide {
  display: none;
}
</style>