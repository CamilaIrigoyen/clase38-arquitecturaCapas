const cartContainer = document.getElementById("CartContainer");
const orderBtn = document.getElementById("newOrder");
const userID = document.getElementById("IDcontainer").textContent;

export async function ViewCart(cartToUpdateView) {
  if (cartToUpdateView) {

    console.log(`Se ejecuta ViewCart para actualizar vista de carrito`);

    const prods = cartToUpdateView.products;

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

    console.log(`Se ejecuta ViewCart para obtener datos y crear vista carrito`);
    console.log(`USERID: ${userID}`);

    try {
      if (userID) {
        //Si el usuario no tiene un ID de carrito asignado, se crea un carrito (EN DB), se le asigna (EN DB) y retorna el carrito, de lo contrario retorna el carrito que tiene asignado.
        await fetch(`../../api/cart/${userID}`, {
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {

            console.log(data);

            const cartProds = data[0].products;

            if (cartProds.length > 0) {
              cartContainer.innerHTML = `
                            <div class="table-responsive">
                                <table class="table table-dark">
                                    <tr class="text-white fw-bold"> 
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Imagen</th>
                                    </tr>
                                    ${cartProds.map(
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
              cartContainer.innerHTML =
                '<h3 class="alert alert-danger">No se encontraron productos</h3>';
            }
          });
      } else {
        console.log(`NO SE RECIBE EL USERID: ${userID}`);
      }
    } catch (error) {
      console.log(
        `Error en la llamada de productos del carrito del usuario (fetch): ${error}`
      );
      return error;
    }
  }
}

ViewCart();
