$(document).ready(() => {
  $('.money').maskMoney({
    affixesStay: "true",
    prefix: "R$ ",
    thousands: ".",
    decimal: ","
  });

  $('#formAddProduct').submit(e => {
    e.preventDefault()
    $('.btn-save').prop('disabled', true);
    const formData = getFormData($(e.target))
    const { code, name, description, price = 0 } = formData
    try {
      formData.price = parseMoneyToFloat(price)
      if (isNaN(formData.price)) formData.price = 0;
    } catch (error) {
      console.log(error)
      $('.btn-save').prop('disabled', false);
      return showToast('Error', 'Houve um produto cadastrado, informações invalidas', 'error', 1.5)
    }

    formData.creator = user.currentUser.email
    db.collection("products").add(formData)
    .then(function(docRef) {
        console.log("sucesso ao cadastrar: ", docRef.id);
        showToast('Sucesso', 'Novo produto cadastrado')
        $('#formAddProduct').trigger('reset')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        showToast('Error', 'Houve um problema no cadastrado', 'error', 1.5)
    })
    .finally(() => {
      $('.btn-save').prop('disabled', false);
    })
  })
})