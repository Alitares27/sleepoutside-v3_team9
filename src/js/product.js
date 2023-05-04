import { getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

const productId = getParam("product");

// eslint-disable-next-line no-console
console.log(findProductById(productId));


