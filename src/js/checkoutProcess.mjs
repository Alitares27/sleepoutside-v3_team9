import { getLocalStorage } from "./utils.mjs";


const checkoutProcess = {
    key:"", 
    outputSelector: "",
    list:[],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,

    init: function(key, outputSelector){
        this.key = key;
        this.outputSeletor  = outputSelector;
        this.list = getLocalStorage(key);
        this.CalculateItemSummary();
    },

    calculateItemSummary: function(){
        // Calculate and display total amount of items in cart, and the number of items

    },

    calculateOrderTotal: function(){
        //calculate the shipping and tax amount, then use them together with the cart total to figure out the order total

        //display the totals
        this.displayOrderTotals();
    },
    displayOrderTotals: function(){
        //dislay totals in the order summary page once they are calculated
    }
}
export default checkoutProcess;