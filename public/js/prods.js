const ProdContainer = document.getElementById("ProdContainer")

fetch('../../api/products')
.then(response => response.json())
.then(prods => {
    const data = prods

    data.forEach(prods => {

        let cards = document.createElement("div");
        cards.setAttribute("class", "card d-flex row justify-content-between mx-2 mb-4");
        cards.setAttribute("style", "width: 15rem;");

        cards.innerHTML = `
            <img class="card-img-top" src=${prods.thumbnail} alt=${prods.brand} ${prods.title}>
            <div class="card-body text-center">
                <h5 class="card-title text-uppercase">${prods.brand}</h5>
                <h5 class="card-title">${prods.title}</h5>
                <p class="card-text">Precio: u$s ${prods.price}</p>
                <button href="#" class="btn btn-primary">AGREGAR A CARRITO</button>
            </div>
        `
        ProdContainer.appendChild(cards)
    });

})
.catch(error => {
    console.log(`Error en la llamada de productos (fetch): ${error}`);
});