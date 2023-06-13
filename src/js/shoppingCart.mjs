import { getLocalStorage, renderListWithTemplate} from "./utils.mjs";

 export default function ShoppingCart(){
   const cartItems = getLocalStorage("so-cart");
   const outputEl = document.querySelector(".product-list-cart");
   renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

   totPrice();
 }

 function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card_image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="Image of ${item.Name}"
      />
      </a>
    <a href="#">
    <h2 class="card__name">${item.Name}</h2>
    </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p></a>
    </li>`;

    return newItem;
  }

  function totPrice() {
    const checkItems = getLocalStorage("so-cart");

    console.log(checkItems);
    const total = document.querySelector(".cart-total");
    const hide = document.querySelector(".hide");
    let prices = [];
    let totalPrice = 0;
    const productPrices = document.getElementsByClassName(".cart-card__price");
    console.log(productPrices);

    for(let i = 0; i < productPrices.length; i++) {
      let priceHtml = productPrices[i].textContent;

      console.log(`Hey ${priceHtml}`);
      let priceFloat = parseFloat(priceHtml.replace("$", ""));
      prices.push(priceFloat);


    }
    

    if (checkItems && checkItems.length > 0){
      prices.forEach(price => {
        totalPrice += price
      })
      hide.style.display = "";
      total.textContent = `Total: $${totalPrice.toFixed(2)}`

    } else{
      hide.style.display = "none";
    }

  }