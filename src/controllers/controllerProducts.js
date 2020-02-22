var table;
$(document).ready(async () => {
  let products = []
  await db.collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() })
    });
  });

  table = $('#table-products').dataTable({
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
      }
    },
    data: products,
    columns: [
      { data: 'code' },
      { data: 'name' },
      { data: 'description' },
      { data: 'units' },
      {
        data: 'price',
        render: function (data, type, row) {
          return parseFloat(data).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }
      }, {
        data: 'id',
        render: function (data, type, dados, {row}) {
          return `<button onclick="edit_product('${data}', this)" class="btn btn-info btn-circle btn-sm"><i class="fas fa-edit"></i></button>
                  <button onclick="delete_product('${data}', this)" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></button>`
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
})

function delete_product(id, btn) {
  var r = confirm("Deseja excluir o registro?");
  if (r == true) {
    db.collection("products").doc(id).delete().then(function () {
      showToast('Sucesso', 'Produto excluido')
      $(btn).closest('tr').remove();
    }).catch(function (error) {
      showToast('Error', 'Houve um problema', 'error', 1.5)
      console.log(error)
    });
  } else {
    console.log(2)
  }
}

function edit_product(id) {
  alert('em breve')
}