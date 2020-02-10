// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, Menu, ipcMain } = require('electron')
const isDev = require('electron-is-dev');
const database = require('./src/config/database')
const path = require('path')

async function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainScreen = new BrowserWindow({
    width, height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  })
  mainScreen.loadFile('./src/view/login.html')
  mainScreen.maximize()
  mainScreen.webContents.openDevTools()

  ipcMain.on('server-online', () => {
    if (mainScreen.getTitle() == 'Hermes') {
      mainScreen.loadFile('./src/view/index.html')
      mainScreen.webContents.openDevTools()
    }
  })

  ipcMain.on('set-title', (event, title) => {
    mainScreen.setTitle(title || 'Hermes');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', async function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('quit', () => {
  app.quit();
});

!isDev && Menu.setApplicationMenu(null)

ipcMain.on('create-product', (e, prod, callback) => {
  Product.create(prod, callback)
})