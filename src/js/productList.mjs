import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimarySmall}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default async function productList(selector, category, numberToDisplay = null) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  var products = await getProductsByCategory(category);
  console.log(products);
  // render out the product list to the element
  if(numberToDisplay != null){
    products = products.slice(0, numberToDisplay);
  }
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}