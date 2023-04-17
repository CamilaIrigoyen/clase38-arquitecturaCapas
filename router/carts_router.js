import { cartDaoMongoDB } from "../daos/index.js";
import { Router } from "express";

const router = Router();

//Crea un carrito y devuelve su id.
router.post("/", (req, res) => {
  cartDaoMongoDB.CreateCart().then((data) => {
    res.json(data);
  });
});

//Vacía un carrito y lo elimina.
router.delete("/:id", (req, res) => {
  let { id } = req.params;

  cartDaoMongoDB.Delete(id).then((data) => {
    res.json(data);
  });
});

//Me permite listar todos los productos que tiene el carrito con dicho id.
router.get("/:idCart/products", (req, res) => {
  let { idCart } = req.params;

  cartDaoMongoDB.GetProds(idCart).then((prods) => {
    res.json(prods);
  });
});

//Para incorporar productos al carrito.
router.post("/:idCart/products/:idProd", (req, res) => {
  let { idCart } = req.params;
  let { idProd } = req.params;

  cartDaoMongoDB.addProdToCart(idCart, idProd).then((data) => {
    res.json(data);
  });
});

//Eliminar un producto del carrito por su id de carrito y de producto.
router.delete("/:idCart/products/:idProd", (req, res) => {
  let { idCart } = req.params;
  let { idProd } = req.params;

  cartDaoMongoDB.DeleteProd(idCart, idProd).then((data) => {
    res.json(data);
  });
});

export default router