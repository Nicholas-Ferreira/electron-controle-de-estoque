var moment = require("moment");

var tableSaida;
$(document).ready(async () => {
  initProdutsSelector()
  initDataTable()
  listarSaidas()
})

$('#formAddSaida').submit(async (e) => {
  e.preventDefault()
  $('.btn-save').prop('disabled', true).html('<div class="lds-dual-ring"></div>');
  const formData = getFormData($(e.target))
  const { units } = formData
  formData.units = isNaN(parseInt(units)) ? 0 : parseInt(units)
  formData.urlNF = await uploadFile()
  formData.creator = user.currentUser.email
  formData.date = moment().format()

  db.collection("output").add(formData)
    .then(function (docRef) {
      console.log("sucesso ao cadastrar: ", docRef.id);
      showToast('Sucesso', 'Saida cadastrado')
      clearInputFile()
      $('select').val(null).trigger("change");
      $('#formAddSaida').trigger('reset')
      addToTable(formData)
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      showToast('Error', 'Houve um problema', 'error', 1.5)
    })
    .finally(() => {
      $('.btn-save').prop('disabled', false).html('Salvar');
    })
})

$('#nf').change((e) => {
  let file = $("#nf")[0].files[0];
  $('#file-display').html(file.name + '<button type="button" class="file-clear-button" onclick="clearInputFile()">x</button>')
})

$('.units').mask('0#', {
  onKeyPress: function (number, event, currentField, options) {
    $(currentField).val(parseInt(number) || 0)
  }
});

async function uploadFile() {
  let file = $("#nf")[0].files[0];
  if (!file) return ''
  let time = moment().format('DDMMYYYYHHmmss')
  let fileName = file.name
  let newFileName = `${time}-${fileName}`
  var file_data = $('#nf').prop('files')[0];

  upload = await new Promise((resolve, reject) => {
    let storageRef = store.ref('launches/' + newFileName);
    var uploadTask = storageRef.put(file_data);
    uploadTask.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.log(error)
      showToast('Error', 'Houve um erro no upload da NF', 'error')
      reject(error)
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        resolve(downloadURL)
      });
    });
  })
  return upload
}

function clearInputFile() {
  $("#nf").val('')
  setTimeout(() => {
    $('#file-display').html('Nenhum arquivo selecionado')
  }, 100);
}
function initProdutsSelector() {
  db.collection("products").get().then((querySnapshot) => {
    $('#list-products').html('<option></option>')
    querySnapshot.forEach(doc => {
      $('#list-products').append(`<option value="${doc.id}" data-price="${doc.data().price}">${doc.data().code} - ${doc.data().name}</option>`)
    });
    $('select').select2({
      placeholder: "Selecione um Produto",
      allowClear: true,
      width: '100%',
      containerCssClass: 'form-control',
      containerCss: {
        border: '1px solid #d1d3e2',
        width: '100%',
        height: 'calc(1.5em + 0.75rem + 2px)',
        padding: '0.375rem 0.75rem',
      }
    });
  });

  $('#list-products').on('select2:select', function (e) {
    var data = e.params.data;
    var docRef = db.collection("products").doc(data.id);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        $("[name='price']").val(doc.data().price)
        $('.money').focus()
        updateTotal()
      } else {
        showToast('Error', 'Erro ao recuperar produto', 'error')
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
      showToast('Error', 'Falha na conexão', 'error', 2)
    });
  });
}
function initDataTable() {
  tableSaida = $('#table-saida').dataTable({
    "language": {
      "decimal": ",",
      "thousands": ",",
      "sEmptyTable": "Nenhum registro encontrado",
      "sPolite": "Mostrando 0 até 0 de 0 registros",
      "sInfo": "Mostrando  _START_ até _END_ de _TOTAL_ Resultados",
      "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
      "sInfoFiltered": "(Filtrados de MAX registros)",
      "sInfoPostFix": "",
      "sInfoThousands": ".",
      "sLengthMenu": "_MENU_ resultados por página",
      "sLoadingRecords": "Carregando...",
      "sProcessing": "Processando...",
      "sZeroRecords": "Nenhum registro encontrado",
      "sSearch": "Pesquisar",
      "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
      },
      "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
      },
    },
    data: [],
    columns: [
      {
        data: 'date',
        render: function (data, type, row) {
          return moment(data).format('DD/MM/YYYY')
        }
      },
      { data: 'product' },
      { data: 'units' },
      { data: 'solicitante' },
      { data: 'note', render: (data) => limitarTexto(data, 35) },
      {
        data: 'id',
        render: function (data, type, dados, { row }) {
          let buttons = ''
          dados.urlNF && (buttons += `<button type='button' onclick="openBrowser('${dados.urlNF}')" class="btn btn-info btn-circle btn-sm"><i class="fas fa-file-pdf"></i></button>`)
          return buttons
        }
      }
    ],
    dom: 'Bfrtip',
    buttons: [
      'copyHtml5',
      'excelHtml5',
      'csvHtml5'
    ]
  });
}

async function listarSaidas() {
  $('#table-saida').dataTable().fnClearTable()
  db.collection("output").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addToTable({ id: doc.id, ...doc.data() })
    });
  })
}
async function addToTable(launch) {
  var product = await getProduct(launch.product)
  launch.product = product.name
  $('#table-saida').dataTable().fnAddData(launch)
}