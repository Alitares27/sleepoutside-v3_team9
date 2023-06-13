import  productList  from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const cat = getParam("category");
productList(".product-list", cat);
