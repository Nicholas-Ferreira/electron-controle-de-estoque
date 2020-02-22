$(document).ready(async () => {
  let products = []
  await db.collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        products.push(doc.data())
    });
  });

  $('#table-products').dataTable({
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
          return parseFloat(data).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }
      },{
        render: function (data, type, row) {
          return ''
        }
      },
    ],
    dom: 'Bfrtip',
    buttons: [
      'copyHtml5',
      'excelHtml5',
      'csvHtml5'
    ]
  });
})