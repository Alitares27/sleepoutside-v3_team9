import {
  getLocalStorage
} from "./utils.mjs";
import {
  checkout
} from "./externalServices.mjs";


function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
  convertedJSON = {};

formData.forEach(function (value, key) {
  convertedJSON[key] = value;
});

return convertedJSON;
}


function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}


const checkoutProcess = {
  lskey: "",
  summarySelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  init(lskey, summarySelector) {
    this.lskey = lskey;
    this.summarySeletor = summarySelector;
    this.list = getLocalStorage(lskey) || [];
    this.CalcAndDisplaySubtotal();
  },

  calcAndDisplaySubtotal: function () {
    // Calculate and display total amount of items in cart, and the number of items
    const summaryElement = document.querySelector(
      this.summarySelector + "#cartTotal"
    );

    const itemNumElement = document.querySelector(
      this.summarySelector + "#num-items"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  },

  calcAndDisplayOrderTotal: function () {
    //calculate the shipping and tax amount, then use them together with the cart total to figure out the order total
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.6).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)
    ).toFixed(2);
    //display the totals
    this.displayOrderTotals();
  },

  displayOrderTotals: function () {
    //dislay totals in the order summary page once they are calculated
    const shipping = document.querySelector(this.summarySelector + "#shipping");
    const tax = document.querySelector(this.summarySelector + "#tax");
    const orderTotal = document.querySelector(this.summarySelector + "#orderTotal");

    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;

  },

  checkout: async function (form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.shipping = this.shipping;
    json.tax = this.tax;
    json.items = packageItems(this.list);
    console.log(json);
    try{
      const res = await checkout(json);
      console.log(res);
    } catch(err){
      console.log(err);
    }
  },
};
export default checkoutProcess;
