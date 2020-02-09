const mongoose = require('mongoose')// within renderer
const { app, ipcRenderer } = require('electron')
const isDev = require('electron-is-dev');
//require('require-dir')('../models')

const init = (callback) => {
  const user = 'admin'
  const pass = '5v7L8uH3Yt5CXkHK'
  const db = 'estoque'

  const url = `mongodb+srv://${user}:${pass}@cluster0-ipdhw.mongodb.net/${db}`
  // mongodb+srv://admin:5v7L8uH3Yt5CXkHK@cluster0-ipdhw.mongodb.net/estoque

  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  mongoose.connection.on('connected', () => {
    console.log('Conectado em ' + url);
    setTimeout(callback, isDev ? 100 : 3000);
  });

  mongoose.connection.on('disconected', () => {
    console.log('Desconectado em ' + url);
    if (process.platform !== 'darwin') app.quit()
  });

  mongoose.connection.on('error', (erro) => {
    console.log('Erro na conexao em ' + erro);
    if (process.platform !== 'darwin') app.quit()
  });
}

module.exports = { init }