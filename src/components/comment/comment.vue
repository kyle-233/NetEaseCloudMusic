<template>
  <div class="comment">
    <div class="c-content">
      <div class="c-h">
        <span class="title">评论</span>
        <span class="num">共{{ totalCount }}条评论</span>
      </div>
      <div class="m-cmmt">
        <!-- 发表评论 -->
        <div class="f-b-p-l-area">
          <div class="a-l">
            <div class="a-l-img">
              <img :src="userUrl" alt="" />
            </div>
          </div>
          <div class="a-r">
            <div class="a-r-t">
              <textarea
                placeholder="评论"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div class="a-r-b">
              <i class="icon e"></i>
              <i class="icon a"></i>
              <a href="" class="c-btn">评论</a>
              <span class="s-y-z-s">140</span>
            </div>
            <div class="other">
              <em class="arrline">◆</em>
              <span class="arrclr">◆</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="c-k-p-l-c">
          <h3>精彩评论</h3>
          <div
            class="p-l-item"
            v-for="(item, index) in comment[pageNo - 1]"
            :key="index"
          >
            <div class="p-l-i-l">
              <a class="p-l-i-c">
                <img :src="item.user.avatarUrl" alt="" />
              </a>
            </div>
            <div class="p-l-i-r">
              <div class="p-l-d-c">
                <div class="p-l-d-u">
                  <a href="">{{ item.user.nickname }}</a
                  >:
                </div>
                <div class="p-l-text">
                  <p>
                    {{ item.content }}
                  </p>
                </div>
              </div>
              <div class="p-l-time-c">
                <div class="p-l-p-t">
                  {{ item.time | formatDate() }}
                </div>
                <a href="" class="p-l-a">
                  <i class="g-icon"></i>
                  ({{ item.likedCount }})
                </a>
                <span class="step">|</span>
                <a href="" class="p-l-a r-h-f">回复</a>
              </div>
            </div>
          </div>
        </div>
        <div class="page">
          <div class="page-c">
            <a
              href="javascript:;"
              @click="prePage"
              :class="{ dark: pageNo === 1 }"
              >上一页</a
            >
            <p>第{{ pageNo }}页</p>
            <a href="javascript:;" @click="nextPage">下一页</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment } from "../../network/comment";
import { mapState } from "vuex";
export default {
  name: "Comment",
  data() {
    return {
      userUrl:
        "http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50",
      comment: [],
      pageNo: 1,
      totalCount: 0,
    };
  },

  computed: {
    ...mapState({
      songId: (state) => state.songplay.songId,
      currentSongInfo: (state) => state.songplay.currentPlaySongInfo,
    }),
  },

  created() {
    // this.getCommenta(this.songId);
    this.getCommenta(this.currentSongInfo.id);
  },

  watch: {
    "currentSongInfo.id": {
      handler(n) {
        this.comment = [];
        this.getCommenta(n);
        this.pageNo = 1;
      },
    },
  },
  filters: {
    formatDate(date) {
      let item = new Date(date);
      let month = item.getMonth() + 1;
      let day = item.getDay() + 1;
      let hour = item.getHours();
      let minute = item.getMinutes();

      return `${month}月${day}日 ${hour}时${minute}分`;
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
      let len = this.comment.length;
      this.pageNo = this.pageNo + 1;
      if (this.pageNo - 1 >= len) {
        this.getCommenta(this.currentSongInfo.id);
      }
    },
    getCommenta(id, pageSize = 20) {
      getComment({
        id: id,
        pageNo: this.pageNo,
        type: 0,
      })
        .then((res) => {
          let { totalCount } = res.data.data;
          this.totalCount = totalCount;
          this.comment.push(res.data.data.comments);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.c-h {
  height: 33px;
  border-bottom: 2px solid #c20c0c;
  /* display: flex; */
  /* align-items: center; */
}
.title {
  font-size: 20px;
  line-height: 28px;
  color: #333;
}
.num {
  font-size: 12px;
  color: #666;
  margin: 9px 0 0 20px;
}

.m-cmmt {
  margin: 20px 0;
}

.f-b-p-l-area {
  width: 100%;
  display: flex;
}

.a-l-img {
  width: 50px;
  height: 50px;
}

.a-l-img img {
  width: 100%;
  height: 100%;
}

.a-r {
  flex: 1;
  margin-left: 12px;
  position: relative;
}

.a-r-t {
  padding-right: 14px;
}

.a-r-t textarea {
  outline: none;
  width: 100%;
  height: 50px;
  padding: 5px 6px 6px;
  resize: none;
  border: 1px solid #cdcdcd;
  border-radius: 2px;
  font-size: 12px;
  line-height: 19px;
}

.a-r-b {
  padding-top: 10px;
  overflow: hidden;
}

.icon {
  width: 18px;
  height: 18px;
  float: left;
  margin: 0 10px 0 0;
  cursor: pointer;
  background: url("../../assets/images/icon.png") no-repeat;
}

.e {
  background-position: -40px -490px;
}

.a {
  background-position: -60px -490px;
}

.c-btn {
  float: right;
  /* display: inline-block; */
  width: 46px;
  height: 25px;
  color: #fff;
  text-align: center;
  line-height: 25px;
  background: url("../../assets/images/button.png") no-repeat;
  background-position: -84px -64px;
  text-decoration: none;
  font-size: 12px;
}

.s-y-z-s {
  color: #999;
  float: right;
  margin-right: 10px;
  line-height: 25px;
  font-size: 12px;
}

.other {
  position: absolute;
  top: 11px;
  left: -7px;
  width: 13px;
  height: 14px;
  overflow: hidden;
}

.arrline {
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-family: "SimSun";
  color: #cdcdcd;
  height: 10px;
  font-size: 15px;
  text-align: left;
  display: block;
}

.arrclr {
  display: block;
  margin: -10px 0 0 1px;
  color: #fff;
  display: block;
  height: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-family: "SimSun";
}
.c-k-p-l-c h3 {
  position: relative;
  top: 1px;
  height: 20px;
  border-bottom: 1px solid #cfcfcf;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

.p-l-item {
  display: flex;
  padding: 15px 0;
  border-top: 1px dotted #ccc;
}

.p-l-i-c {
  display: block;
  width: 50px;
  height: 50px;
}

.p-l-i-c img {
  width: 100%;
  height: 100%;
}

.p-l-i-r {
  margin-left: 12px;
  width: 100%;
}

.p-l-d-c {
  display: flex;
}

.p-l-d-u {
  font-size: 12px;
}

.p-l-d-u a {
  text-decoration: none;
  font-size: 12px;
  color: #0c73c2;
  margin-right: 5px;
  line-height: 20px;
}

.p-l-text {
  font-size: 12px;
  flex: 1;
  word-break: break-word;
}

.p-l-text p {
  padding: 0;
  margin: 0 0 0 5px;
  line-height: 20px;
}

.p-l-time-c {
  margin-top: 15px;
  overflow: hidden;
  text-align: right;
}

.p-l-p-t {
  float: left;
  color: #999;
  font-size: 12px;
}
.p-l-a {
  text-decoration: none;
  color: #333;
  font-size: 12px;
}
.p-l-a:hover {
  text-decoration: underline solid #333;
}
.g-icon {
  display: inline-block;
  width: 15px;
  height: 14px;
  vertical-align: -2px;
  margin: -4px 5px 0 0;
  background: url("../../assets/images/icon2.png") no-repeat;
  background-position: -150px 0;
}
.step {
  font-size: 12px;
  margin: 0 8px;
  color: #333;
}

.r-h-f {
  color: #666;
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