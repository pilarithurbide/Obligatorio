//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let url = "https://japdevdep.github.io/ecommerce-api/product/all.json"


const ORDER_ASC_BY_$ = "Economico";
const ORDER_DESC_BY_$ = "Premium";
const ORDER_BY_PROD_REL = "Mas vendidos";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_$)
    {
        result = array.sort(function(a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);
            if ( aPrecio < bPrecio ){ return -1; }
            if ( aPrecio > bPrecio ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_$){
        result = array.sort(function(a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost)
            if ( aPrecio > bPrecio ){ return -1; }
            if ( aPrecio < bPrecio ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

            htmlContentToAppend += `
            <a href="url" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <h5 class="mb-1">`+ product.currency + product.cost +`</h5>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_$, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_$);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_$);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});

/* CODIGO INICIAL
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
    let htmlContentToAppend = ""
    for (let valor of obj) {
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + valor.imgSrc + `" alt="` + valor.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ valor.name +`</h4>
                        <small class="text-muted">` + valor.soldCount + ` artículos vendidos</small>
                    </div>
                    <p class="mb-1">` + valor.description + `</p>
                    <h5 class="mb-1">`+ valor.currency + valor.cost +`</h5>
                </div>
            </div>
        </a>`
    }
    d1.innerHTML += htmlContentToAppend
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJson(url).then(function(data){
        console.log(data);
        var obj= data;
        enPantalla(obj) 
    })
       
    })

;*/