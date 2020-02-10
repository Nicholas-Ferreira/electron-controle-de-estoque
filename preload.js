// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const mongoose = require('mongoose');
const isDev = require('electron-is-dev');
const { ipcRenderer } = require('electron')
const path = require('path')
require('require-dir')('./src/models')

if (!mongoose.connection.host) {
  let USER = 'admin'
  let PASSWORD = '5v7L8uH3Yt5CXkHK'
  let DATABASE = 'estoque'
  let url = `mongodb+srv://${USER}:${PASSWORD}@cluster0-ipdhw.mongodb.net/${DATABASE}`

  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  mongoose.connection.on('connected', () => {
    console.log('connected')
    setTimeout(() => {
      ipcRenderer.send('server-online')
    }, isDev ? 100 : 3000);
  });

  mongoose.connection.on('disconected', () => {
    console.log('Desconectado em ' + url);
  });

  mongoose.connection.on('error', (erro) => {
    console.log('Erro na conexao em ' + erro);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
