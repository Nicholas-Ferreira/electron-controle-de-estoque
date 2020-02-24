var { shell } = require('electron')

function openBrowser(url) {
  shell.openExternal(url)
}

function primeiraMaiuscula(palavra) {
  return palavra.substring(0, 1).toUpperCase().concat(palavra.substring(1));
}

function primeirasMaiuscula(frase) {
  frase = frase.replace('_', ' ')
  return frase.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
}

function parseMoneyToFloat(moedaReal) {
  try {
    var val = parseFloat(moedaReal.toString().replace('R$ ', '').replace('.', '').replace(',', '.'))
    return isNaN(val) ? 0 : val
  } catch (error) {
    return 0
  }
}
function parseFloatToMoney(float) {
  try {
    return float.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})
  } catch (error) {
    return 0
  }
}


/**
 * @param {Number} min Minimo
 * @param {Number} max Maximo
 */
function getRandom(min = 0, max = 1000) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
};