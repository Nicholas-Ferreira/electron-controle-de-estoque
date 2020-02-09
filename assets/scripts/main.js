const INIT_PAGE = 'dashboard'

navigation = (location = INIT_PAGE) => {
  $('#page').load(`${location}.html`);
  $('#page-title').html(primeiraMaiuscula(location));
};navigation()