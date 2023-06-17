import { loadHeaderFooter,initializeNewsletter } from "./utils.mjs";
import { cartItemCountUpdate } from "./cartImageAdjuster.js";
import { checkLogin } from "./auth.mjs";
import productList from "./productList.mjs";


const numberToDisplay = 4;
loadHeaderFooter();
cartItemCountUpdate();
initializeNewsletter();
checkLogin();
productList(".product-list", "tents", numberToDisplay);
