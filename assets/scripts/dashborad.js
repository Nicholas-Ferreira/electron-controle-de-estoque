var MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var config = {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
    datasets: [{
      label: 'Entrada',
      backgroundColor: '#090',
      borderColor: '#090',
      data: [
        10, 20, 4, 30, 20, 15
      ],
      fill: false,
    }, {
      label: 'Saida',
      fill: false,
      backgroundColor: '#e00',
      borderColor: '#e00',
      data: [
        20, 10, 34, 20, 24, 10
      ],
    }]
  },
  options: {
    legend: {
      position: 'right'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  }
};

var ctx = document.getElementById('canvas').getContext('2d');
window.myLine = new Chart(ctx, config);