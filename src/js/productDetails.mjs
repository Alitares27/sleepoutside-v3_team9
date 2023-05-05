import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product = {};

// 1. productDetails(productId)
export default async function productDetails(productId)
{
    product = await findProductById(productId);

    renderProductDetails();

    document.getElementById("addToCart").addEventListener("click", addToCart);
}

// 2. addToCart()
function addToCart() {
    setLocalStorage("so-cart", product);
  }
/*  // add to cart button event handler
  async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
  }
  
  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
*/

//3. renderProductDetails()

function renderProductDetails(){

    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}