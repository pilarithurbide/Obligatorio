//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let url = "https://japdevdep.github.io/ecommerce-api/product/all.json"

var d1 = document.getElementById('contenido')

function getJson(info){
    return fetch(info)
        .then( response => {
            if (response.ok) {
                return response.json();
            } else {
            throw Error(response.statusText);
            }
        })
}

function enPantalla(obj){
         for (let valor of obj) {
            d1.innerHTML += 'Nombre: ' + valor.name + '<br/>' + 'Descripción: ' + valor.description + '<br/>' + 'Costo: USD ' + valor.cost + '<br/>' + '<br/>'
         }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJson(url).then(function(data){
        console.log(data);
        var obj= data;
        enPantalla(obj) 
    })
       
    })

;