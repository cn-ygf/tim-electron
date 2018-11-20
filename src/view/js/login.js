const ipc = require('electron').ipcRenderer

//关闭按钮事件
function on_btn_close(){
    ipc.send('on_btn_close')
}

//登录按钮事件
function on_btn_login(){
    ipc.send('on_btn_login')
}