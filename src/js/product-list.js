import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { cartItemCountUpdate } from "./cartImageAdjuster.js";


  loadHeaderFooter();
  const category = getParam("category");
  productList(".product-list", category);
  cartItemCountUpdate();