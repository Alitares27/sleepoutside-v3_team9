import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);
function addToCart() {
  setLocalStorage("so-cart", product);
}
