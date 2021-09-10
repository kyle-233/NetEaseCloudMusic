<template>
  <div class="headerNavbar">
    <div class="h-top">
      <div class="h-top-container">
        <div class="h-top-left">
          <div class="h-top-left-logo">
            <a href="/#"></a>
          </div>
          <div>
            <ul class="h-top-item">
              <li
                v-for="(item, index) in lists"
                :key="index"
                @click="handleChange(index)"
              >
                <router-link
                  :to="item.path"
                  :class="[
                    $route.path === item.path
                      ? 'link-active'
                      : currentIndex === index
                      ? 'link-active'
                      : '',
                  ]"
                  >{{ item.label }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="h-top-right">
          <div class="h-top-search-content">
            <div class="h-top-search-icon"></div>
            <input type="text" placeholder="音乐/视频/电台/用户" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNavBar",
  data() {
    return {
      currentIndex: 0,
      // lists: [
      //   {
      //     label: "发现音乐",
      //     path: "/home/found",
      //     children: [],
      //   },
      //   {
      //     label: "我的音乐",
      //     path: "/home/mymusic",
      //   },
      //   {
      //     label: "朋友",
      //     path: "/home/friends",
      //   },
      // ],
      lists: [
        {
          label: "发现音乐",
          path: "/home",
          children: [],
        },
        {
          label: "我的音乐",
          path: "/home/mymusic",
        },
        {
          label: "朋友",
          path: "/home/friends",
        },
      ],
    };
  },
  created() {},
  methods: {
    handleChange(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.h-top {
  height: 70px;
  background-color: #242424;
  border-bottom: 1px solid #000;
}

.h-top-container {
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.h-top-left {
  display: flex;
}

.h-top-left-logo {
  width: 176px;
  height: 69px;
  background-image: url("../../assets/images/topbar.png");
  background-position: 0 0;
}

.h-top-left-logo a {
  display: block;
  width: 100%;
  height: 100%;
}

.h-top-item,
ul {
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
  height: 100%;
}

li a {
  height: 100%;
  text-decoration: none;
}

.h-top-item li a {
  font-size: 14px;
  padding: 0 19px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ccc;
}

.h-top-item .link-active {
  background-color: #000;
  color: #fff;
  position: relative;
}

.h-top-item .link-active::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-bottom: 5px solid #c20c0c;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.h-top-item li a:hover {
  background-color: #000;
  color: #fff;
}

.h-top-right {
  display: flex;
  align-items: center;
}

.h-top-search-content {
  background-color: #fff;
  height: 32px;
  width: 158px;
  border-radius: 32px;
  display: flex;
  align-items: center;
}

.h-top-search-icon {
  width: 30px;
  height: 100%;
  background-image: url(../../assets/images/topbar.png);
  background-repeat: np-repeat;
  background-position: 0px -313px;
}

.h-top-search-content input {
  width: 116px;
  height: 16px;
  font-size: 12px;
  border: none;
  outline: none;
}

.h-top-search-content input::-webkit-input-placeholder,
.h-top-search-content input :-ms-input-placeholder,
.h-top-search-content input :-moz-placeholder,
.h-top-search-content input ::-moz-placeholder {
  color: #9b9b9b;
}
</style>
