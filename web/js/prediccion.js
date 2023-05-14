async function empezarPrediccion() {
    
    const response = await fetch('http://127.0.0.1:8000/prediccion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });


    window.location.href = '/tablaDatos.html';
    
    
    
}


function downloadCsv() {
    const url = "http://localhost:8000/download";
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        readFile(blob);
      })
      .catch(error => console.error(error));
}

function solitarGraficas(producto) {
    if(producto ===""){
        
        return 0;
    }

    fetch(`http://localhost:8000/grafica?producto=${producto}`)

      .then(response => response.json())
      .then(data => {
        const fechas = data.fechas;
        const numero = data.numero;
        console.log(fechas, numero);
        // hacer algo con los arrays recibidos
        return createAndAddLineChart(fechas, numero);
      })
      .catch(error => console.error(error));

      
  }



