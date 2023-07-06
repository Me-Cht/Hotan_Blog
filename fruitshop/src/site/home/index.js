// 定义变量
//留言板ID
const message_input = document.querySelector('#message_input')
//提交按钮
const submit = document.querySelector('#sub')
//已留言ID
const my_message = document.querySelector('#my_message')
//留言内容
const message01 = document.querySelector('#message01')
// 字数限制
const total = document.querySelector('.total')
//  留言板样式变化
message_input.addEventListener('focus', function () {
    console.log('聚焦了')
    message_input.classList.add('new_board')
    total.style.opacity = 1;
})
//  留言板样式变化
message_input.addEventListener('blur', function () {
    console.log('失去了焦点')
    message_input.classList.remove('new_board')

    total.style.opacity = 0;

})
// 留言板样式变化


//点击提交进行留言
message_input.addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为
    const message = message_input.value; // 获取输入框的值
// 在这里执行提交内容的逻辑，例如发送到服务器或添加到留言列表
// 清空输入框的值
    message_input.value = '';

})

//留言字数统计
message_input.addEventListener('input', function (event) {
    console.log(message_input.value.length)//得到输入字符串的长度
    total.innerHTML = `${message_input.value.length}/200`
})
// 点击提交进行留言
submit.addEventListener('click', function (event) {
    event.preventDefault(); // 阻止表单默认提交行为
    total.style.opacity = 1;
    const message = message_input.value; // 获取输入框的值
// 在这里执行提交内容的逻辑，例如发送到服务器或添加到留言列表
// 将留言内容显示在留言板上
    my_message.innerHTML = `我的留言：${message}`;
// 清空输入框的值
    message_input.value = '';
});
// 回车提交留言
message_input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const message = message_input.value; // 获取输入框的值
        const li = document.createElement('li')
        li.innerHTML = `${message}`
        console.log(message.children)
// 清空输入框的值
        li.style.width = '430px';
        li.style.height = '70px'
        li.style.marginRight = "30px"
        my_message.appendChild(li)
        message_input.value = '';
    }
})
$(document).ready(function () {
    $('.login').hover(function () {
        $(this).find('ul').show()

    }, function () {
        $(this).find('ul').hide();
    });
});


