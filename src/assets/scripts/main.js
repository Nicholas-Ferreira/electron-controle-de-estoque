
const ipc = require('electron').ipcRenderer;
const path = require('path')

const INIT_PAGE = 'dashboard'
const ERROR_IMAGE = '../../src/assets/images/error.png'
const SUCCESS_IMAGE =  '../../src/assets/images/success.png'
let history = []

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    $('#page-top').load(`estrutura.html`);
    setTimeout(() => {
      $('#link-dashboard').click()
    }, 100);
  } else {
    $('#page-top').load(`login.html`);
  }
});

signout = () => {
  firebase.auth().signOut().then(function() {
    $('#page-top').load(`login.html`);
    location.reload()
  }).catch(function(error) {
    showToast('Ops!', error.message, 'error', 1.5)
  });
}

changePage = (location) => {
  let button = ''
  if (history.length >= 1) button = `
    <span class="icon text-gray-600" onclick="backPage()" style="cursor: pointer;padding:5px">
      <i class="fas fa-arrow-left"></i>
    </span>`
  $('#page').load(`${location}.html`);
  $('#page-title').html(`${button}<label>${primeirasMaiuscula(location)}</label>`);
  $('#current-page').val(location)
};

navigation = (location) => {
  let corrent_page = $('#current-page').val()
  if(corrent_page == location) return changePage(location);
  history.push(corrent_page)
  history = removeDuplicates(history)
  changePage(location)
};

backPage = () => {
  let lastPage = history[history.length-1]
  history.pop()
  changePage(lastPage)
}

showToast = (title = type, mensage, type = 'success', delay = 1) => {
  let id = getRandom(1, 10000)
  let toast = `
    <div id="toast-${id}" class="toast" role="alert" aria-live="assertive" 
      aria-atomic="true" data-autohide="true" data-delay="${delay * 1000}">
      <div class="toast-header">
        <img src="${type == 'success' ? SUCCESS_IMAGE : ERROR_IMAGE}" class="rounded mr-2" alt="${type}" width="23px">
        <strong class="mr-auto">${primeiraMaiuscula(title)}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${mensage}
      </div>
    </div>
  `
  $('#toast-area').append(toast)
  $(`#toast-${id}`).toast("show")
  setTimeout(() => {
    $(`#toast-${id}`).detach()
  }, delay * 1000 + 500);
}