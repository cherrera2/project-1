'use strict';

/* <--------------- Global Variables ---------------> */

var formData = document.forms[0];


/* <--------------- Shipping Data Storage ---------------> */

const shipDataArr = [];
var shippingFormData = document.getElementById('shipping-form');
var navPick = document.getElementById('navigation').children[0];
var billingButton = document.getElementById('to-billing');

try {
  shippingFormData.addEventListener('input', fillShippingForm);
} catch (e) {

}

function fillShippingForm() {
  var a = shpData("shipping");
}

function shpData(x) {
  var type = x;
  var shipCount = 0;
  var verifyData = 0;

  for (let i = 0; i < formData.length; i++) {
    shipDataArr[i] = formData[i].value;

    if (shipDataArr[i] != "") {
      shipCount++;
    }
  }

  if (type == "shipping") {
    var atIndex = shipDataArr[1].indexOf("@");
    var dotIndex = shipDataArr[1].indexOf(".");
  }

  else if (type == "billing") {
    var atIndex = shipDataArr[2].indexOf("@");
    var dotIndex = shipDataArr[2].indexOf(".");
  }

  if (atIndex > 0 && dotIndex > atIndex && dotIndex != atIndex + 1){
    verifyData++;
  }

  else {
    verifyData = 0;
  }

  if (type == "shipping") {
    var phoneNumber = parseInt(shipDataArr[9]);

    if (phoneNumber.toString().length == 10) {
      shipDataArr[9] = phoneNumber;
      verifyData++;
    }
    else {
      verifyData = 0;
    }
  }

  else if (type == "billing") {
    var phoneNumber = parseInt(shipDataArr[10]);

    if (phoneNumber.toString().length == 10) {
      shipDataArr[10] = phoneNumber;
      verifyData++;
    }
    else {
      verifyData = 0;
    }
  }

  console.log(shipCount);

  if(type == "shipping") {

    var contTo = shipCount == 10 && shipDataArr[7] != "" && verifyData == 2
        || shipCount == 9 && shipDataArr[7] == "" && verifyData == 2;

    if (contTo == true) {
      navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>";
      navPick.children[2].innerHTML = "<a href=\"./payment/\">Payment</a>";
      billingButton.innerHTML = "<a href=\"./billing/\">Continue to Billing</a>";

      localStorage.setItem("localBillingData", shipDataArr);
    }
    else {
      navPick.children[1].innerHTML = "";
      navPick.children[2].innerHTML = ""
      billingButton.innerHTML = "Continue to Billing";
    }

  }

  else if (type == "billing") {

    var contTo = shipCount == 11 && shipDataArr[8] != "" && verifyData == 2
        || shipCount == 10 && shipDataArr[8] == "" && verifyData == 2;

    if (contTo == true) {
      navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";
      billingButton.innerHTML = "<a href=\"../billing/\">Continue to Payment</a>";

      localStorage.setItem("localShippingData", shipDataArr);
    }
    else {
      navPick.children[2].innerHTML = ""
      billingButton.innerHTML = "Continue to Payment";
    }

  }

}

/* <--------------- Billing Data Storage ---------------> */

var billingFormData = document.getElementById('billing-form');



try {
  billingFormData.addEventListener('input', fillBillingForm);
} catch (e) {

}

function fillBillingForm() {
  var a = shpData("billing");
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
  formData.addEventListener("change", otherPrice)
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

function otherPrice() {

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
}

function closeCart() {
  document.getElementById('cart').style.display = "none";
}
