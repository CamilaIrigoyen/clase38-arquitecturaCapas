const cartContainer = document.getElementById("CartContainer")
const orderBtn = document.getElementById("newOrder")

function ViewCart(){

    //VER COMO OBTENER LA DATA
    const prods =  [{_id: "1",  title: "uno", price: "333", thumbnail: "img",}, {_id: "2", title: "dos", price: "555", thumbnail: "img",}]

    if (prods.length > 0) {
        cartContainer.innerHTML = `
            <div class="table-responsive">
                <table class="table table-dark">
                    <tr class="text-white fw-bold"> 
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                    </tr>
                    ${prods.map(
                      (prod) =>
                        `<tr>
                            <td class="align-middle">${prod._id}</td>
                            <td class="align-middle">${prod.title}</td>
                            <td class="align-middle">$${prod.price}</td>
                            <td class="align-middle">
                                <img src=${prod.thumbnail} style="width: 80px">
                            </td>
                        </tr>`
                    )}
                </table>
            </div>`;
    } else {
        cartContainer ='<h3 class="alert alert-danger">No se encontraron productos</h3>';
    }
}

ViewCart()