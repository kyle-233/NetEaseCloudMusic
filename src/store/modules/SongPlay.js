import { getSongDetail, getSongUrl } from '@/network/home'

export default {
  state: {
    songId: '',
    lock: true,
    // 当前播放的音乐的信息
    currentPlaySongInfo: {
      // songId
      id: null,
      // song name
      name: '',
      // songers play this song
      artists: [],
      // song picture
      picUrl: '',
      // song duration
      duration: 0,
      al: null,
      mv: 0,
      alia: [],
    },
    // 播放列表
    playlistsId: [],

    // song url
    currentSongUrl: '',
  },
  mutations: {
    getId(state, id) {
      state.songId = id;
    },
    handlelock(state) {
      state.lock = !state.lock;
    },
    //获取歌曲信息
    mutationGetSongInfo(state, res) {
      state.songId = res.id;
      state.currentPlaySongInfo.id = res.id;
      state.currentPlaySongInfo.name = res.name;
      state.currentPlaySongInfo.artists = res.ar;
      state.currentPlaySongInfo.al = res.al;
      state.currentPlaySongInfo.duration = res.dt;
      state.currentPlaySongInfo.mv = res.mv;
      state.currentPlaySongInfo.alia = res.alia;
      state.currentPlaySongInfo.picUrl = res.al.picUrl;

      window.localStorage.setItem('currentMusicInfo', JSON.stringify(state.currentPlaySongInfo))
    },

    // 获取歌曲播放链接
    mutationGetSongUrl(state, res) {
      state.currentSongUrl = res;

      window.localStorage.setItem('currentMusicUrl', JSON.stringify(state.currentSongUrl))
    },
    // 播放列表
    mutationSetPlayLists(state, id) {
      if (!state.playlistsId.includes(id)) {
        state.playlistsId.unshift(id);

        window.localStorage.setItem('playLists', JSON.stringify(state.playlistsId));
      }
    },



    // 获取storage的数据
    getCurrentMusicFromStorage(state, data) {
      state.currentPlaySongInfo = data;
    },

    getPlayListsFromStorage(state, data) {
      state.playlistsId = data;
    },

    deletePlayList(state, id) {
      let index = state.playlistsId.indexOf(id);
      if (id === state.currentPlaySongInfo.id) {
        state.currentPlaySongInfo = {};
      }
      state.playlistsId.splice(index, 1);
      window.localStorage.setItem('playLists', JSON.stringify(state.playlistsId));
      window.localStorage.setItem('currentMusicInfo', JSON.stringify(state.currentPlaySongInfo))
    },
  },
  actions: {
    async actionGetSongInfo({ commit }, id) {
      const { data: res } = await getSongDetail({
        id: id,
      });
      commit('mutationGetSongInfo', res.songs[0]);
    },

    async actionGetSongUrl({ commit }, id) {
      if (!id) return;
      const { data: res } = await getSongUrl({
        id: id,
      })
      commit('mutationGetSongUrl', res.data[0].url)
    },

    async actionAutoPlayMusic({ dispatch, state }) {
      let len = state.playlistsId - 1;
      let index = state.playlistsId.indexOf(state.currentPlaySongInfo.id);
      if (index !== len) {
        let next = state.playlistsId[index + 1];
        dispatch('actionGetSongInfo', next);
        dispatch('actionGetSongUrl', next);
      }
    }
  }
}