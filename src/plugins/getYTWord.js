var array = [];
document.querySelectorAll('.ytd-comment-renderer #content-text a').forEach((item) => {
    var data = {
        "showDate": true,
        "songName": item.nextElementSibling.textContent.replace(/\r/g, '').split(' / ')[0],
        "singer": item.nextElementSibling.textContent.replace(/\r/g, '').split(' / ')[1],
        "songTime": item.textContent,
        "songLink": item.href,
    };
    array.push(data);
})
console.log(array);

// nextElementSibling 取得下一個物件
// previousElementSibling 取得上一個物件