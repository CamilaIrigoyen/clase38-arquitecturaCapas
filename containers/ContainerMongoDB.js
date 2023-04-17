import { productsDaoMongoDB } from "../daos/index.js";
import { logger } from "../config/winston_config.js"
import mongoose from "mongoose";

//MODEL_1 = cartSchema o prodsSchema depende cual se llame.
//MODEL_2 = userSchema.

class ContainerMongoDB {
  constructor(model_1, model_2, route) {
    this.model_1 = model_1;
    this.model_2 = model_2;
    this.route = route;
  }

  //PRODUCTS / CARTS - lista los datos recibidos.
  async ListAll() {
    try {
      let data = await this.model_1.find({});
      return data;
    } catch (error) {
      logger.error(`Error en operacion de base de datos: ${error}`)
      return { error: "Error en operacion de base de datos" };
    }
  }

  //PRODUCTS - crea un producto. Recibe title, price y thumbnail.
  async CreateProd(data) {
    try {
      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const date = new Date().toLocaleString();
      const prodToAdd = {
        ...data,
        code: random(1, 9999).toString(),
        timestamp: date,
      };
      const newProd = new this.model_1(prodToAdd);
      await newProd.save();
      logger.info("Producto creado con exito")
      return newProd;
    } catch (error) {
      logger.error(`Error en la creacion del producto: ${error}`)
      return { error: `Error en la creacion del producto: ${error}`}
    }
  }

  //CARTS
  async CreateCart() {
    try {
      const date = new Date().toLocaleString();
      const cartToAdd = {
        timestamp: date,
        products: [],
      };
      const newCart = new this.model_1(cartToAdd);
      const savedCart = await newCart.save();
      logger.info("Carrito creado con exito")
      return savedCart._id.toString();
    } catch (error) {
      logger.error(`Error en la creación del carrito: ${error}`)
      return {error: `Error en la creación del carrito: ${error}`}
    }
  }

  //CARTS
  async assignsCartID(userID) {
    try{
      const user = await this.model_2.find({_id: userID})
      const userCart = user[0].cartID
      if(!userCart.length > 0){

        console.log("no tiene asignado ID");

        const date = new Date().toLocaleString();
        const cartToAdd = {
          timestamp: date,
          products: [],
        };
        const newCart = new this.model_1(cartToAdd);
        const savedCart = await newCart.save();

        const userToUpdate = { _id: userID };
        const update = { cartID: savedCart._id.toString()}
        await this.model_2.updateOne(userToUpdate, update)
        
        logger.info("Carrito creado con exito y asignado a usuario")

        return [savedCart]

      } else {
        const cart = await this.model_1.find({_id: userCart})
        return cart
      }
    }catch(error) {
      logger.error(`Error al asignarle el ID de carrito al usuario: ${error}`)
      return error
    }
  }

  //PRODUCTS / CARTS - LISTA PRODUCTO O CARRITO POR ID
  async ListById(id) {
    try {
      const data = await this.model_1.findById(id);
      return data;
    } catch (error) {
      logger.error(`Error al listar los datos: ${error}`)
      return{error: `Error al listar los datos: ${error}`}
    }
  }

  //CART - lista los productos de x carrito
  async GetProds(idCart) {
    try {
      const cart = await this.model_1.findById(idCart);
      return cart.products;
    } catch (error) {
      logger.error(`Error al listar el carrito: ${error}`)
      return {error: `Error al listar el carrito: ${error}`}
    }
  }

  //CART - inserta un producto en un carrito
  async addProdToCart(idCart, idProd) {
    const prod = await productsDaoMongoDB.ListById(idProd);
    try {
      const cart = await this.model_1.findById(idCart);
      const prodsArray = cart.products;
      prodsArray.push(prod);
      await this.model_1.updateOne({ _id: idCart }, { products: prodsArray });
      logger.info("Producto agregado con exito")
      return await this.model_1.findById(idCart);
    } catch (error) {
      logger.error(`Error al insertar un producto en el carrito: ${error}`)
      return {error: `Error al insertar un producto en el carrito: ${error}`}
    }
  }

  //PRODUCTS - recibe y actualiza un producto según su id.
  async UpdateProd(id, obj) {
    try {
      await this.model_1.updateOne({ _id: id }, obj);
      const prods = await this.model_1.find({});
      logger.info("Producto actualizado")
      return prods;
    } catch (error) {
      logger.error(`Error al actualizar producto: ${error}`)
      return { error: "Error en la actualización del producto" };
    }
  }

  //CART - elimina un producto de un carrito
  async DeleteProd(idCart, idProd) {
    try {
      const cart = await this.model_1.findById(idCart);
      const prodsArray = cart.products;
      const update = prodsArray.filter((p) => p._id != idProd);
      await this.model_1.updateOne({ _id: idCart }, { products: update });
      logger.info("Producto eliminado con exito")
      return await this.model_1.findById(idCart);
    } catch (error) {
      logger.error(`Error al eliminar el producto: ${error}`)
      return { error: "Error al intentar eliminar el producto" };
    }
  }

  //PRODUCTS / CARTS - elimina por id
  async Delete(id) {
    try {
      await this.model_1.deleteOne({ _id: id });
      logger.info(`Objeto con id: ${id}, ha sido eliminado con exito`)
      return await this.model_1.find({});
    } catch (error) {
      logger.error(`Error en la eliminación del objeto: ${error}`)
      return { Error: "Error en la eliminación del objeto" };
    }
  }
}

export default ContainerMongoDB