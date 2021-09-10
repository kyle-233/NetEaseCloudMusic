<template>
  <div class="lyricview">
    <div class="lyrics-content">
      <div ref="lyricDiv" class="lyrics">
        <ul ref="lyric" style="transition: 0.3s">
          <span
            class="lyric-i"
            v-for="(item, index) in lyric"
            :key="item.uid"
            :class="{ acting: lyricIndex === index }"
            :data-index="index"
          >
            {{ item.lyric.trim() }}
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LyricView",
  props: {
    lyric: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      lyricIndex: 0,
    };
  },
};
</script>

<style scoped>
ul {
  margin: 0%;
  padding: 0;
}
.lyric-i {
  display: block;
  font-size: 12px;
  line-height: 23px;
}
</style>