import { getLocalStorage, renderListWithTemplate} from "./utils.mjs";

 export function ShoppingCart(){
   const cartItems = getLocalStorage("so-cart");
   const outputEle = document.querySelector(".product-list");
   renderListWithTemplate(cartItemTemplate, outputEle, cartItems) 
 }

 function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card_image">
      <img
        src="${item.Image}"
        alt="Image of ${item.Name}"
      />
      </a>
    <a href="#">
    <h2 class="card__name">${item.Name}</h2>
    </a>
      <p class="cart-card__color">${item.Color[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p></a>
    </li>`;

    return newItem;
  }