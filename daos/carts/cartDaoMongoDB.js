import mongoose from "mongoose";
import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import { urlMongoDB } from "../../DB/connection.js"
import { cartSchema } from "../../DB/schemas.js"

mongoose.set("strictQuery", false);

const model = mongoose.model("carts", cartSchema);

class CartsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super(
      model,
      urlMongoDB
    )
  }
};

export default CartsDaoMongoDB