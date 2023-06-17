import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
//import {animateCart, cartItemCountUpdate} from "./cartImageAdjuster.js";


export default async function productDetails(productId) {
    const product = await findProductById(productId);
    console.log(product);
    renderProductDetails(product);
    document.getElementById("addToCart").addEventListener("click",
     () => addToCart(product));
}

export function addToCart(product) {
  product.Quantity = 1;
  const cartItems = getLocalStorage("so-cart") || [];
  const existingProduct = cartItems.find(item => item.Id === product.Id);

  if (existingProduct) {
    product.Quantity += existingProduct.Quantity;
    cartItems.splice(cartItems.findIndex(item => item.Id === product.Id), 1);
  } 

  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);
  //animateCart();
  //cartItemCountUpdate();
}



function renderProductDetails(product) {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
      product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText =
      product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
      product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}