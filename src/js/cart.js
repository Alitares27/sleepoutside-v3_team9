import { loadHeaderFooter } from "./utils.mjs";
import  ShoppingCart  from "./shoppingCart.mjs";
import { cartItemCountUpdate } from "./cartImageAdjuster.js";

loadHeaderFooter();
ShoppingCart();
cartItemCountUpdate();