<template>
  <div class="nologin">
    <div class="nl-c">
      <div class="nl-bg">
        <div class="pic">
          <h2>登录网易云音乐</h2>
          <a href="" class="btn">立即登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoLogin",
};
</script>

<style scoped>
.nl-bg {
  width: 807px;
  height: 372px;
  margin: 0 auto 0;
  background: url("../../assets/images/mymusic.png") no-repeat 0 9999px;
  background-position: 0 104px;
}
.pic h2 {
  height: 100px;
  text-indent: -9999px;
  font-size: 100%;
  margin: 0;
  padding: 0;
}

.pic .btn {
  display: block;
  width: 167px;
  height: 45px;
  margin: 206px 0 0 482px;
  text-indent: -9999px;
  background: url("../../assets/images/mymusic.png") no-repeat;
  background-position: 0 9999px;
}

.pic .btn:hover {
  /* background-position: -10px -385px; */
  background-position: 0 -278px;
}
</style>