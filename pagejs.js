const vm = new Vue({
  data: {
    searchWord: '',
    songListAll: [],
    showSongArray: [],
    songListArray: arrayData,
  },
  methods: {
    get(data, key) {
      return _.get(data, key)
    },
    shList(data) {
      _.set(data, 'showList', !_.get(data, 'showList'))
    },
    SearchSong() {
      this.showSongArray = [];
      if (this.searchWord) {
        _.find(this.songListAll,(find) => {
          _.find(find.songList, (song) => {
            if (song.songName.match(new RegExp(this.searchWord, 'i'))) {
              _.set(find, 'showDate', true);
              _.set(song, 'showDate', true);
              this.showSongArray.push(find);
            } else {
              _.set(song, 'showDate', false);
            }
          })
        });
      } else {
        this.showSongArray = this.songListAll;
        _.find(this.showSongArray,(find) => {
          _.set(find, 'showDate', true);
          _.find(find.songList, (song) => {
            _.set(song, 'showDate', true);
          })
        });
      }
      console.log(this.showSongArray, 'showSongArray');
    },
  },
  mounted() {
    _.forEach(this.songListArray, (v, i) => {
      _.set(v, '[0]showDate', true);
      _.forEach(v.songList, (song) => {
        _.set(song, 'showDate', true);
      })
      this.songListAll = _.concat(this.songListAll, v);
    })
    this.showSongArray = this.songListAll;
    console.log('test');
  }
});
setTimeout(() => {
  vm.$mount('#app');
}, 1000);