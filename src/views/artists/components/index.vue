<template>
  <div class="index">
    <ul>
      <li v-for="(item, index) in indexLists" :key="index">
        <a
          href="javascript:;"
          :class="{ indexActive: index === currentIndex }"
          @click="changeIndex(index)"
          >{{ item }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      currentIndex: 0,
      indexLists: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "其他",
      ],
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      this.$emit("indexChange", this.indexLists[index]);
    },
  },
};
</script>

<style scoped>
.index {
  width: 100%;
}

.index ul {
  list-style: none;
  display: flex;
  margin: 20px 0 0 -3px;
  padding: 0;
  justify-content: space-between;
}

.index ul li {
  margin-left: 3px;
  font-size: 14px;
  padding: 0;
  margin: 0;
}

.index ul li a {
  font-size: 12px;
  display: inline-block;
  padding: 0 5px;
  line-height: 24px;
  text-decoration: none;
  color: #000;
}

.indexActive {
  background-color: #c20c0c;
  border-radius: 2px;
  color: #fff !important;
}
</style>