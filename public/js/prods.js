import { ViewCart } from "./carts.js";
const cartUserID = document.getElementById("IDcartUser").textContent

const ProdContainer = document.getElementById("ProdContainer")

async function GetProds () {

    if(cartUserID){
        console.log(`CARTUSERID: ${cartUserID}`);
        try{
            //devuelve todos los productos
            await fetch('../../api/products')
            .then(response => response.json())
            .then(data => {
                const prods = data
            
                async function AddToCart (prodID) {
                    try{
                        await fetch(`../../api/cart/${cartUserID}/products/${prodID}`, {
                            method: 'POST'
                        })
                        .then(response => response.json())
                        .then(cart => {
                            console.log(`El producto: ${prodID} ha sido agregado exitosamente al carrito: ${cartUserID}`);
                            
                            //ACTUALIZA VISTA CARRITO
                            ViewCart(cart)
                        })
                    }catch(error){
                        console.log(`Error al agregar el producto: ${prodID} al carrito: ${cartUserID} (fetch): ${error}`);
                    }
                }

                prods.forEach( prods => {
            
                    let cards = document.createElement("div");
                    cards.setAttribute("class", "card d-flex row justify-content-between mx-2 mb-4");
                    cards.setAttribute("style", "width: 15rem;");
            
                    cards.innerHTML = `
                        <img class="card-img-top" src=${prods.thumbnail} alt=${prods.brand} ${prods.title}>
                        <div class="card-body text-center">
                            <h5 class="card-title text-uppercase">${prods.brand}</h5>
                            <h5 class="card-title">${prods.title}</h5>
                            <p class="card-text">Precio: u$s ${prods.price}</p>
                            <button class="btn btn-primary" id="${prods._id}">AGREGAR A CARRITO</button>
                        </div>
                    `
                    ProdContainer.appendChild(cards)

                    let btnAddToCart = document.getElementById(`${prods._id}`);

                    btnAddToCart.addEventListener("click", () => {   
        
                        AddToCart(`${prods._id}`); 

                    }); 
        
                });
            
            })
        }catch(error){
            console.log(`Error en la llamada de productos (fetch): ${error}`);
            return error
        }
    }else {
        console.log(`NO SE RECIBE EL CARTUSERID: ${cartUserID}`);
    }
}

GetProds()