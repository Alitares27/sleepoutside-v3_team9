import { getLocalStorage, setLocalStorage} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formToOrder(form){
  const formData = new FormData(form);
  const order = {};

  for(const[key, value] of formData){
    order[key] = value;
  }
  return order;
}

function packageItems(items) {
  return items.map((item) =>({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: item.Quantity,
  }))
};

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0.06,
  orderTotal: 0,

  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },

  calculateItemSummary: function () {
    const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
    itemNumElement.innerHTML = this.list.reduce((sum, item) => sum + item.Quantity, 0);
    const amounts = this.list.map((item) => item.FinalPrice * item.Quantity);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = "$" + this.itemTotal;    
    this.calculateOrdertotal();
  },
  
  calculateOrdertotal: function () {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  
  displayOrderTotals: function () {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    const json = formToOrder(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.log(err);
    }
  },
  
};

export default checkoutProcess;