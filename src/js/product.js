import { getParam, loadHeaderFooter } from "./utils.mjs"
import productDetails from "./productDetails.mjs";
import { cartItemCountUpdate } from "./cartImageAdjuster.js";


loadHeaderFooter();
const productId = getParam("product");
console.log(productId);
productDetails(productId);
cartItemCountUpdate();
