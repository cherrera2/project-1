'use strict';

const strPrice = document.getElementsByClassName('price');
const normPrice = [];
const updatePrice = [];
const qty = document.getElementsByClassName('qty');

var updateShipping = document.getElementById('shipping-form');
var updateCart = document.getElementById('cart')
var updateSub = document.getElementById('subtotal').children[1]
var updateShippingPrice = document.getElementById('shipping').children[1];
var updateTax = document.getElementById('tax').children[1];
var updateTotal = document.getElementById('total').children[1];

var cont = document.getElementById('country-name');

var sub = 0;
var shipping = 0;
var tax = 0;
for (let i = 0; i < strPrice.length; i++) {
  normPrice[i] = parseFloat(strPrice[i].innerHTML.replace("$", ""));
  updatePrice[i] = normPrice[i]
  sub += updatePrice[i]
}

updateSub.innerHTML = "$" + sub;
updateTotal.innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);
if (tax != 0){
  updateTax.innerHTML = "$" + (tax * sub).toFixed(2);
}

updateCart.addEventListener("change", updateQty);
updateShipping.addEventListener("change", shipPrice)

function updateQty() {
  sub = 0;
  for (let i = 0; i < qty.length; i++) {
    updatePrice[i] = (normPrice[i] * parseInt(qty[i].value));
    strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
    sub += updatePrice[i]
  }
  updateSub.innerHTML = "$" + sub.toFixed(2);
  updateTotal.innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);
  if (tax != 0){
    updateTax.innerHTML = "$" + (tax * sub).toFixed(2);
  }

}

function shipPrice() {

  if (cont.value == "united states") {
    shipping = 10;
    tax = 0.08;
  }

  else if (cont.value == "canada") {
    shipping = 15;
    tax = 0.10;
  }

  else if (cont.value == "united kingdom") {
    shipping = 20;
    tax = 0.12;
  }
  else {
    shipping = 30;
    tax = 0.15;
  }

  updateShippingPrice.innerHTML = "$" + shipping.toFixed(2);
  updateTax.innerHTML = "$" + (tax * sub).toFixed(2);

}
