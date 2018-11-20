const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let loginWindow
let mainWindow

function createWindow () {
  // 创建浏览器窗口。
  loginWindow = new BrowserWindow({ width: 436, height: 310, frame: false, resizable:false,show:false })

  // 然后加载应用的 index.html。
  loginWindow.loadFile('src/view/login.html')

  // 打开开发者工具
  //loginWindow.webContents.openDevTools()
  loginWindow.on('ready-to-show',()=>{
      loginWindow.show()
  })
  // 当 window 被关闭，这个事件会被触发。
  loginWindow.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    loginWindow = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (loginWindow === null) {
    createWindow()
  }
})

ipc.on('on_btn_close',()=>{
    app.quit()
})

ipc.on('on_btn_login',()=>{
    mainWindow = new BrowserWindow({ width: 900, height: 550, frame: false,show:false})
    // 然后加载应用的 index.html。
    mainWindow.loadFile('src/view/index.html')
    // 打开开发者工具
    //mainWindow.webContents.openDevTools()
    // 当 window 被关闭，这个事件会被触发。
    mainWindow.on('closed', () => {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 与此同时，你应该删除相应的元素。
      mainWindow = null
    })
    mainWindow.on('ready-to-show',()=>{
        mainWindow.show()
    })
    loginWindow.close()
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。