$(document).ready(() => {
  $('.units').mask('0#', {
    onKeyPress: function (number, event, currentField, options) {
      $(currentField).val(parseInt(number) || 0)
    }
  });

  $('.money').maskMoney({
    affixesStay: "true",
    prefix: "R$ ",
    thousands: ".",
    decimal: ","
  });

  $('#formAddProduct').submit(e => {
    e.preventDefault()
    const Products = require('../models/schemaProducts')
    const formData = getFormData($(e.target))
    const { code, name, units = 0, description, price = 0 } = formData

    try {
      formData.units = parseInt(units)
      formData.price = parseMoney(price)
      if (isNaN(formData.units)) {
        throw new Error('units is NaN');
      }
      if (isNaN(formData.price)) formData.price = 0
    } catch (error) {
      console.log(error)
      showToast('Error', 'Houve um produto cadastrado, informações invalidas', 'error', 1.5)
      return e.preventDefault()
    }

    Products.create(formData, (error) => {
      if (error) {
        console.log(error)
        showToast('Error', 'Houve um produto cadastrado', 'error', 1.5)
      } else {
        $(e.target).trigger("reset");
        console.log('sucesso ao cadastrar')
        showToast('Sucesso', 'Novo produto cadastrado')
      }
    })
  })
})