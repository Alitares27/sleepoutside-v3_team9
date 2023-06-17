import {getLocalStorage, renderListWithTemplate} from "./utils.mjs"

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href="/product_pages/index.html?product=${item.Id}">
    <img
      src='${item.Images.PrimaryMedium}'
      alt='${item.Name}'
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <div id="quantityElement" class="quantity-element"
    <span id="quantityDisplay" class="quantity-display">QTY: ${item.Quantity}</span>    
    </div>
</li>`;

  return newItem;
}

export default async function cartList(){
  const cartItems = getLocalStorage("so-cart")

  if (cartItems === null) {
    document.querySelector(".product-list").innerHTML =
      "Your cart could use a healthy dose of camping gear to get the fun started!";
  } else {
    const parentEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, parentEl, cartItems);

    // Delete 'hide' class in div 'cart-footer'
    document.querySelector("div.cart-footer').classList.remove('hide");
    // Display Total in Cart
    document.querySelector(".cart-total").innerHTML = `Total: $${calculateTotal(cartItems)}`;
  }
}



function calculateTotal(list) {
    let sumTotal = 0;
    list.forEach((item) => {
      const itemPrice = parseFloat(item.FinalPrice);
      const itemQuantity = parseInt(item.Quantity);
      const itemTotal = itemPrice * itemQuantity;
      sumTotal += itemTotal;
    });
    return sumTotal;
  }
  