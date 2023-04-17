import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import { urlMongoDB } from "../../DB/connection.js";
import { ProdsSchema } from "../../DB/schemas.js"
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const model = mongoose.model("products", ProdsSchema);

class ProductsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super(model, urlMongoDB);
  }
}

export default ProductsDaoMongoDB