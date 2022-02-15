'use strict';

/* <--------------- Shipping Data Storage ---------------> */

const shipDataArr = [];

var formDataShipping = document.getElementById('shipping-form');
var navPick = document.getElementById('navigation').children[0];
var billingButton = document.getElementById('to-billing');

try {
  formDataShipping.addEventListener("change", shpData);
} catch (e) {

}

function shpData() {
  var shipCount = 0;
  var verifyData = 0;
  for (let i = 0; i < formDataShipping.length; i++) {
    shipDataArr[i] = formDataShipping[i].value;

    if (shipDataArr[i] != "") {
      shipCount++;
    }
  }

  var atIndex = shipDataArr[1].indexOf("@");
  var dotIndex = shipDataArr[1].indexOf(".");

  if (atIndex > 0 && dotIndex > atIndex && dotIndex != atIndex + 1){
    verifyData++;
  }

  else {
    verifyData = "no";
    console.log("no")
  }

  var phoneNumber = parseInt(shipDataArr[9]);

  if (phoneNumber.toString().length == 10) {
    shipDataArr[9] = phoneNumber;
    verifyData++;
  }
  else {
    verifyData = "no";
  }

  var contToBilling = shipCount == 10 && shipDataArr[7] != "" && verifyData == 2
      || shipCount == 9 && shipDataArr[7] == "" && verifyData == 2;

  if (contToBilling == true) {
    navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>"
    navPick.children[2].innerHTML = "<a href=\"./payment/\">Payment</a>"
    billingButton.innerHTML = "<a href=\"./billing/\">Continue to Billing</a>"
  }
  else {
    navPick.children[1].innerHTML = ""
    navPick.children[2].innerHTML = ""
    billingButton.innerHTML = "Continue to Billing"
  }
}




/* <--------------- Shopping Cart Manipulation ---------------> */

const strPrice = document.getElementsByClassName('price');
const normPrice = [];
const updatePrice = [];
const qty = document.getElementsByClassName('qty');

var updateCart = document.getElementById('cart')
var updateSub = document.getElementById('subtotal').children[1]
var updateShipping = document.getElementById('shipping').children[1];
var updateTax = document.getElementById('tax').children[1];
var updateTotal = document.getElementById('total').children[1];
var clickBag = document.getElementById('bag').children[0];
var clickX = document.getElementById('x-button').children[0];
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

try {
  formDataShipping.addEventListener("change", shipPrice)
} catch (e) {

}

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

  updateShipping.innerHTML = "$" + shipping.toFixed(2);
  updateTax.innerHTML = "$" + (tax * sub).toFixed(2);

}

clickBag.addEventListener('click', openCart);
clickX.addEventListener('click', closeCart);

function openCart() {
  document.getElementById('cart').style.display = "block";
  console.log("hi");
}

function closeCart() {
  document.getElementById('cart').style.display = "none";
  console.log("hi");
}
