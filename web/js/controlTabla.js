var filasporpagina = 10;
var paginas = []; //[numero pagina, filas de la pagina]
var valores;

function rellenarTabla(datos) {
    //datos[columnas][filas]
    valores = datos;
    let conjuntoFilas = [];
    let cont = 0;

    for (let i = 1; i < datos[0].length-1; i++) {
        let fila = '<tr class="bg-white border-b">'
        fila += '<td class="id px-6 py-3">'+datos[0][i] + '</td>';
        fila += '<td class="date px-6 py-3">'+ datos[1][i] + '</td>';
        fila += '<td class="year_week px-6 py-3">'+ datos[2][i] + '</td>';
        fila += '<td class="product_number px-6 py-3">'+ datos[3][i] + '</td>';
        fila += '<td class="reporterhq_id px-6 py-3">'+ datos[4][i] + '</td>';
        fila += '<td class="prod_category px-6 py-3">'+ datos[5][i] + '</td>';
        fila += '<td class="specs px-6 py-3">'+ datos[6][i] + '</td>';
        fila += '<td class="display_size px-6 py-3">'+ datos[7][i] + '</td>';
        fila += '<td class="segment px-6 py-3">'+ datos[8][i] + '</td>';
        fila += '<td class="sales_units px-6 py-3">'+ datos[9][i] + '</td>';
        fila += '<td class="inventory_units px-6 py-3">'+ datos[10][i] + '</td>';

        fila += '<tr>';

        conjuntoFilas[cont++] = fila;
        //$("#cuerpo-resultados").append(fila);
        
    }

    paginarTabla(conjuntoFilas);
    rellenarSelect();
    
}

function rellenarSelect() {
    const select = document.getElementById("ids_producto");
    const fragmento = document.createDocumentFragment();
    const elementosUnicos = {};

    valores[3].slice(1).forEach(element => {
        elementosUnicos[element] = true;
    });

    for (const elementoUnico in elementosUnicos) {
        const option = document.createElement("option");
        option.value = elementoUnico;
        option.textContent = elementoUnico;
        fragmento.appendChild(option);
    }
    

    select.appendChild(fragmento);
    document.getElementById("modal-container").style.display='none';
}

function paginarTabla(conjuntoFilas) {
    paginas = [];
    //let numeroPaginas = Math.ceil(conjuntoFilas.length/filasporpagina);
    $("#cuerpo-resultados").empty();
    let numeroPaginas = 0;
    let cont = 0;
    for (let i = 0; i < conjuntoFilas.length; i++) {

       
        if (cont == filasporpagina) {
            cont = 0;
            numeroPaginas++;
        }

        // Crear un array secundario vacío para cada página
        if (!paginas[numeroPaginas]) {
            paginas[numeroPaginas] = [];
        }

        // Agregar la fila actual al array secundario correspondiente
        paginas[numeroPaginas][cont++] = conjuntoFilas[i];
        
    }
    //console.log(paginas)
    mostrarPagina(0);
    // mostrarPagina(750);

}

function mostrarPagina(numPag) {
    
    $("#cuerpo-resultados").empty();
    $("#paginador").empty();
    let paginador ='';
    if(numPag > 0){
        paginador += '<button '
        + 'class="px-4 py-2 text-sm font-bold text-sky-600 bg-transparent border border-sky-600 rounded-l-lg hover:bg-sky-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-skyy-500 focus:bg-sky-900 focus:text-white"'
        + 'onclick="mostrarPagina('+ (numPag-1) +')">'
        + '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">'
        + '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />'
        +' </svg>'        
        +'</button>'


        
    }

    if(numPag < 5){
        for (let i = 0; i < numPag; i++) {            

            paginador += '<button '
            + 'class="px-4 py-2 text-sm font-bold text-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
            +'onclick="mostrarPagina('+ i +')">' + (i+1) + '</button>';

            
            
        }
    }else{
        for (let i = numPag-5; i < numPag; i++) {

            paginador += '<button '
            +'class="px-4 py-2 text-sm font-bold text-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
            +'onclick="mostrarPagina('+ i +')">' + (i+1) + '</button>';
            
            
        }
    }

    if(numPag > paginas.length-5 ){
        for (let i = numPag; i < paginas.length; i++) {
            if(i === numPag){
                paginador += '<button '
                +'class="px-4 py-2 text-sm font-bold border-sky-600 bg-sky-600 text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
                +'onclick="mostrarPagina('+ i +')">' + (numPag+1) + '</button>';
            }else{
                paginador += '<button '
                + 'class="px-4 py-2 text-sm font-bold text-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
                +'onclick="mostrarPagina('+ i +')">' + (i+1) + '</button>';
            }
        }
    }else{
        for (let i = 0; i < 5; i++) {
            if(i+numPag === numPag){

                paginador += '<button '
                +'class="px-4 py-2 text-sm font-bold border-sky-600 bg-sky-600 text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
                +'onclick="mostrarPagina('+ i +')">' + (numPag+1) + '</button>';
            }else{
                paginador += '<button '
                + 'class="px-4 py-2 text-sm font-bold text-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
                + 'onclick="mostrarPagina('+ (numPag + i) +')">' + (i+1+numPag) + '</button>';
                
            }
            
        }
    }
    
    
    if(numPag < paginas.length-1){
        paginador += '<button'
        +' class="px-4 py-2 text-sm font-bold text-sky-600 bg-transparent border border-sky-600 rounded-r-md hover:bg-sky-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gsky-500 focus:bg-sky-900 focus:text-white"'
        +' onclick="mostrarPagina('+ (numPag+1) +')">'
        +' <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">'
        +' <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />'
        +'</svg>'
      
        
        +'</button>';
    }
    
    $("#cuerpo-resultados").append(paginas[numPag]);
    $("#paginador").append(paginador);

}


function filtrarFecha(fechaBuscar) {
    
    if(fechaBuscar===""){
        document.getElementById("modal-container").style.display='none';
        rellenarTabla(valores);
    }else{
        const fecha = new Date(fechaBuscar).toLocaleDateString();
    
        let conjuntoFiltrado = [];
        for (let i = 0; i < valores[0].length; i++) {

            if(valores[1][i] == fechaBuscar){
                console.log("holaa");
                let fila = '<tr class="bg-white border-b">'
                fila += '<td class="id px-6 py-3">'+valores[0][i] + '</td>';
                fila += '<td class="date px-6 py-3">'+ valores[1][i] + '</td>';
                fila += '<td class="year_week px-6 py-3">'+ valores[2][i] + '</td>';
                fila += '<td class="product_number px-6 py-3">'+ valores[3][i] + '</td>';
                fila += '<td class="reporterhq_id px-6 py-3">'+ valores[4][i] + '</td>';
                fila += '<td class="prod_category px-6 py-3">'+ valores[5][i] + '</td>';
                fila += '<td class="specs px-6 py-3">'+ valores[6][i] + '</td>';
                fila += '<td class="display_size px-6 py-3">'+ valores[7][i] + '</td>';
                fila += '<td class="segment px-6 py-3">'+ valores[8][i] + '</td>';
                fila += '<td class="sales_units px-6 py-3">'+ valores[9][i] + '</td>';
                fila += '<td class="inventory_units px-6 py-3">'+ valores[10][i] + '</td>';

                fila += '<tr>';

                conjuntoFiltrado.push(fila);
            }
            
        }


        paginarTabla(conjuntoFiltrado);
    }
    

    
}

function insertarImagen() {
    $("#meter-img").empty();
    document.getElementById("modal-container2").style.display='block';

    let numeroProducto = document.getElementById("ids_producto").value;

    const imagen = document.createElement("img");
    imagen.src = "/img/content/sample_data/product_number_"+numeroProducto+".png";

    $("#meter-img").append(imagen);
}


  