const mongoose = require('mongoose');
const isDev = require('electron-is-dev');

const init = (callback) => {
  const user = 'admin'
  const pass = '5v7L8uH3Yt5CXkHK'
  const db = 'estoque'

  const url = `mongodb+srv://${user}:${pass}@cluster0-ipdhw.mongodb.net/${db}?retryWrites=true&w=majority`
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
  });

  mongoose.connection.on('error', (erro) => {
    console.log('Erro na conexao em ' + erro);
  });
}

loadModels = (ipcMain) => {
    require('../models/schemaProducts')(ipcMain)
}

module.exports = { init, loadModels }