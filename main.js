const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

var exec = require('child_process').exec;
exec('node server.js', function(err, stdout, stderr){
  if (err) { console.log(err); }
});

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 320, height: 480})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
