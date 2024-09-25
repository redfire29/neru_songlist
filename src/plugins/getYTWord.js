var array = [];
var splitWord = '/'
var getIndex = 0;
document.querySelectorAll('.ytd-expander#content #content-text')[getIndex].querySelectorAll('a').forEach((item, index) => {
    var songlist = document.querySelectorAll('.ytd-expander#content #content-text')[getIndex].querySelectorAll('span')[0].textContent.split('\n')
    var data = {
        "showDate": true,
        "songName": songlist[index+0].split(splitWord)[1],
        "singer": songlist[index+0].split(splitWord)[0].split(item.textContent)[1],
        "songTime": item.textContent,
        "songLink": item.href,
    };
    array.push(data);
})
console.log(array);


// 舊版本
// var array = [];
// var splitWord = ' / '
// document.querySelectorAll('.ytd-expander#content #content-text')[0].querySelectorAll('a').forEach((item) => {
//     var data = {
//         "showDate": true,
//         "songName": item.nextElementSibling.textContent.replace(/\r/g, '').split(splitWord)[0],
//         "singer": item.nextElementSibling.textContent.replace(/\r/g, '').split(splitWord)[1],
//         "songTime": item.textContent,
//         "songLink": item.href,
//     };
//     array.push(data);
// })
// console.log(array);

// nextElementSibling 取得下一個物件
// previousElementSibling 取得上一個物件