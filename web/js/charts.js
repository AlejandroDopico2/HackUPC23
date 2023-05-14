function createAndAddLineChart(fechas, productos){
  if(fechas==="" || productos ===""){
    return 0;
  }
  //document.getElementById("modal-container").style.display='block';
  let datos = [];
  for (let i = 0; i < fechas.length; i++) {
    datos.push(fechas[i],productos[i]);
    
  }

  // let datos = [{
  //   name: 'Installation & Developers',
  //   data: 
  // }];
  
  Highcharts.chart('container', {

    title: {
      text: 'grafica de ejemplo',
      align: 'left'
    },

    yAxis: {
      title: {
        text: 'Products'
      }
    },

    xAxis: {
      title: {
        text: 'Date'
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },

    series: [{
      name: 'Nombre de la serie',
      data: datos
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  });

}
