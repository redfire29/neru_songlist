const vm = new Vue({
  data: {
    searchWord: '',
    songListAll: [],
    showSongArray: [],
    songListArray: arrayData,
    dateList: [],
    selectDate: '',
  },
  methods: {
    dateSelect() {
      this.allSongSH(false);
      const selectDate = _.get(this.selectDate, 'date');
      if (selectDate !== '') {
        _.filter(this.showSongArray, (v) => {
          if (v.date.match(new RegExp(selectDate, 'i'))) {
            _.set(v, 'showDate', true);
            _.forEach(_.get(v, 'songList'), (song) => {
              _.set(song, 'showDate', true);
            })
          }
        })
      } else {
        this.openAllSong(true);
      }
    },
    allSongSH(sh) {
      _.find(this.showSongArray,(find) => {
        _.set(find, 'showDate', sh);
        _.find(find.songList, (song) => {
          _.set(song, 'showDate', sh);
        })
      });
    },
    get(data, key) {
      return _.get(data, key)
    },
    shList(data) {
      _.set(data, 'showList', !_.get(data, 'showList'))
    },
    SearchSong(searchKey) {
      if (this.searchWord) {
        this.allSongSH(false);
        _.find(this.songListAll,(find) => {
          _.find(find.songList, (song) => {
            if (_.get(song, searchKey).match(new RegExp(this.searchWord, 'i'))) {
              _.set(find, 'showDate', true);
              _.set(song, 'showDate', true);
            } else {
              _.set(song, 'showDate', false);
            }
          })
        });
      } else {
        this.showSongArray = this.songListAll;
        this.allSongSH(true);
      }
    },
  },
  mounted() {
    _.forEach(this.songListArray, (v, i) => {
      const getYear = {
        date: moment(v.date).format('YYYY')
      };
      const getM = moment(v.date).format('YYYY/M');
      const findYear = _.find(this.dateList, { date: getYear.date });
      if (findYear) {
        const findM = _.find(this.dateList, {date: getM});
        if (findM) {
          this.dateList.push({
            date: moment(v.date).format('YYYY/M/D'),
          });
        } else {
          this.dateList.push({
            date: getM,
          });
          this.dateList.push({
            date: moment(v.date).format('YYYY/M/D'),
          });
        }
      } else {
        this.dateList.push(getYear);
        this.dateList.push({
          date: getM,
        });
        this.dateList.push({
          date: moment(v.date).format('YYYY/M/D'),
        });
      }
      _.set(v, '[0]showDate', true);
      _.forEach(v.songList, (song) => {
        _.set(song, 'showDate', true);
      })
      this.songListAll = _.concat(this.songListAll, v);
    })
    this.showSongArray = this.songListAll;
  }
});
setTimeout(() => {
  vm.$mount('#app');
}, 1000);