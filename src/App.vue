<script setup>
import get from 'lodash/get';
import filter from 'lodash/filter';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import concat from 'lodash/concat';
import moment from 'moment';
import { onMounted, ref } from 'vue';
import songListArray from '@/plugins/array.js';

const searchWord = ref('');
const songListAll = ref([]);
let showSongArray = ref([]);
const dateList = ref([]);
const selectDate = ref('');

const allSongSH = (sh) => {
  find(showSongArray.value,(findData) => {
    set(findData, 'showDate', sh);
    find(findData.songList, (song) => {
      set(song, 'showDate', sh);
    })
  });
}

const dateSelect = () => {
  allSongSH(false);
  const SD = get(selectDate.value, 'date');
  if (SD !== '') {
    filter(showSongArray.value, (v) => {
      if (v.date.match(new RegExp(SD, 'i'))) {
        set(v, 'showDate', true);
        forEach(get(v, 'songList'), (song) => {
          set(song, 'showDate', true);
        })
      }
    })
  } else {
    openAllSong(true);
  }
}

const shList = (data) => {
  set(data, 'showList', !get(data, 'showList'))
}

const SearchSong = (searchKey) => {
  if (searchWord.value) {
    allSongSH(false);
    find(songListAll.value, (findData) => {
      find(findData.songList, (song) => {
        if (get(song, searchKey)) {
          if (get(song, searchKey).match(new RegExp(searchWord.value, 'i'))) {
            set(findData, 'showDate', true);
            set(song, 'showDate', true);
          } else {
            set(song, 'showDate', false);
          }
        }
      })
    });
  } else {
    showSongArray.value = songListAll.value;
    allSongSH(true);
  }
}

onMounted(() => {
  forEach(songListArray, (v, i) => {
    const getYear = {
      date: moment(v.date).format('YYYY')
    };
    const getM = moment(v.date).format('YYYY/M');
    const findYear = find(dateList.value, { date: getYear.date });
    if (findYear) {
      const findM = find(dateList.value, {date: getM});
      if (findM) {
        dateList.value.push({
          date: moment(v.date).format('YYYY/M/D'),
        });
      } else {
        dateList.value.push({
          date: getM,
        });
        dateList.value.push({
          date: moment(v.date).format('YYYY/M/D'),
        });
      }
    } else {
      dateList.value.push(getYear);
      dateList.value.push({
        date: getM,
      });
      dateList.value.push({
        date: moment(v.date).format('YYYY/M/D'),
      });
    }
    set(v, '[0]showDate', true);
    forEach(v.songList, (song) => {
      set(song, 'showDate', true);
    })
    songListAll.value = concat(songListAll.value, v);
  })
  showSongArray.value = songListAll.value;
})

</script>

<template lang="pug">
div(class="max-w-screen-md")
  div(class="border-solid border-2 mb-1 p-1 bg-white")
    p
      span(class="text-gray-600") 公告：這是非官方自製的 
      a(href="https://www.youtube.com/@neruch.7527", target="_blank", class="text-[#574281]") Neru Ch. 闇音ネル 
      span(class="text-gray-600") 歌單列表合集, 可能會有遺漏, 請多包涵！
  .timetaglist.border-solid.border-2.mb-1.p-1
    h1.text-2xl 感謝時間軸標記：
    .taglist
      p 雨宮沙耶花
      p 哈哈捏嚕我阿姐啦
      p Mao
      p Anonymous ZY
      p 武佐オサム
      p 管理員伯伯
      p 蘋狗紅茶-りんご茶
      p SWeeds
      p 😈安靜🕊️【糾結靜】
  .serchbar.mb-2
    input(class="border-solid border-[1px] w-full md:w-1/2", type='text', v-model='searchWord')
    div(class="inline-block w-full md:w-1/2")
      div.search(@click="SearchSong('songName')")
        p Search Song
      div.search(@click="SearchSong('singer')")
        p Search Singer
  div(class="mb-2")
    p(class="inline-block mr-1") Date Select
    select(v-model="selectDate", @change="dateSelect()", class="inline-block")
      option(value="") all
      option(v-for="date in dateList", :value='date') {{get(date, 'date')}}
  .songlist
    .list(v-for='songData in showSongArray')
      .dateword(v-if="get(songData, 'showDate')", @click="shList(songData)")
        div(class="w-[calc(100%-24px)] float-left")
          p(class="text-lg") {{get(songData, 'streamName')}}
          p(class="text-base") {{get(songData, 'date')}}
        svg(xmlns="http://www.w3.org/2000/svg"
        , fill="none"
        , viewBox="0 0 24 24"
        , stroke-width="1.5"
        , stroke="currentColor"
        , :class="{'rotate-180': get(songData, 'showList')}"
        , class="float-right w-6 h-6 text-[#261d38]")
          path(stroke-linecap="round", stroke-linejoin="round", d="M19.5 8.25l-7.5 7.5-7.5-7.5")
        .clear-both
      .song(v-for="song in get(songData, 'songList')", v-show="get(songData, 'showList') && get(song, 'showDate')")
        a(:href="get(song, 'songLink')", target='_blank', class="text-lg")
          p
            span {{`${get(song, 'songName')} / ${get(song, 'singer')}`}}
</template>

<style scoped>
</style>
