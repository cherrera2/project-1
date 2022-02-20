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
  var filledCount = 0;
  var verifyData = 0;

  try {
    var checked = document.getElementById('same-as-shipping').checked
  } catch (e) {

  }

  if (checked == true) {

    for (let i = 0; i < localStorage.localShippingData.split(",").length; i++) {
      shipDataArr[i] = localStorage.localShippingData.split(",")[i];

      if (shipDataArr[i] != "") {
        filledCount++;
      }

    }

    for (let i = 1; i < formData.length; i++) {
      formData[i].value = localStorage.localShippingData.split(",")[i-1];
      formData[i].setAttribute("disabled", "true");
    }

  }

  else if (checked == false) {

    for (let i = 1; i < formData.length; i++) {
      shipDataArr[i-1] = formData[i].value;

      if (shipDataArr[i-1] != "") {
        console.log("yes");
        filledCount++;
      }
    }

    for (let i = 1; i < formData.length; i++) {
      try {
        formData[i].removeAttribute("disabled");
      } catch (e) {

      }

    }

  }

  else {
    for (let i = 0; i < formData.length; i++) {
      shipDataArr[i] = formData[i].value;

      if (shipDataArr[i] != "") {
        filledCount++;
      }
    }

  }

  var atIndex = shipDataArr[1].indexOf("@");
  var dotIndex = shipDataArr[1].indexOf(".");

  if (atIndex > 0 && dotIndex > atIndex && dotIndex != atIndex + 1){
    verifyData++;
  }

  else {
    verifyData = 0;
  }

  var phoneNumber = parseInt(shipDataArr[9]);

  if (phoneNumber.toString().length == 10) {
    shipDataArr[9] = phoneNumber;
    verifyData++;
  }
  else {
    verifyData = 0;
  }

  console.log(filledCount);

  if(type == "shipping") {

    var contTo = filledCount == 10 && shipDataArr[7] != "" && verifyData == 2
        || filledCount == 9 && shipDataArr[7] == "" && verifyData == 2;

    if (contTo == true) {
      navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>";
      navPick.children[2].innerHTML = "<a href=\"./payment/\">Payment</a>";
      billingButton.innerHTML = "<a href=\"./billing/\">Continue to Billing</a>";

      localStorage.setItem("localShippingData", shipDataArr);
    }
    else {
      navPick.children[1].innerHTML = "";
      navPick.children[2].innerHTML = ""
      billingButton.innerHTML = "Continue to Billing";
    }

  }

  else if (type == "billing") {

    var contTo = filledCount == 10 && shipDataArr[7] != "" && verifyData == 2
        || filledCount == 9 && shipDataArr[7] == "" && verifyData == 2;

    if (contTo == true) {
      navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";
      billingButton.innerHTML = "<a href=\"../billing/\">Continue to Payment</a>";

      localStorage.setItem("localBillingData", shipDataArr);
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

/* <--------------- Payment Data Storage ---------------> */

const paymentDataArr = [];

var paymentFormData = document.getElementById('payment-form');
var confirmButton = document.getElementById('to-confirm');

try {
  paymentFormData.addEventListener('input', payData);
} catch (e) {

}

function payData() {
  var filledCount = 0;

  for (let i = 0; i < formData.length; i++) {
    paymentDataArr[i] = formData[i].value;

    if (paymentDataArr[i] != "") {
      filledCount++;
    }
  }

  if (paymentDataArr[0].length >= 13 && paymentDataArr[0].length <= 19 &&
      paymentDataArr[1].length == 4 && paymentDataArr[2].length >= 3 &&
      paymentDataArr[2].length <= 4 && filledCount == 4) {
    confirmButton.innerHTML = "<a href=\"../billing/\">Confirm Order</a>";

    localStorage.setItem("localPaymentData", paymentDataArr);
  }

  else {
    confirmButton.innerHTML = "Confirm Order";
  }

}

/* <--------------- Shopping Cart Manipulation ---------------> */

const strPrice = document.getElementsByClassName('price');
const normPrice = [];
const updatePrice = [];
const qty = document.getElementsByClassName('qty');

var updateCart = document.getElementById('cart');
var updateSummary = document.getElementById('summary');
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

updateSummary.children[1].children[1].innerHTML = "$" + sub;
updateSummary.children[4].children[1].innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);
if (tax != 0){
  updateSummary.children[3].children[1].innerHTML = "$" + (tax * sub).toFixed(2);
}

updateCart.addEventListener('input', updateQty);


  formData.addEventListener('input', otherPrice)


function updateQty() {
  sub = 0;
  for (let i = 0; i < qty.length; i++) {
    updatePrice[i] = (normPrice[i] * parseInt(qty[i].value));
    strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
    sub += updatePrice[i]
  }
  updateSummary.children[1].children[1].innerHTML = "$" + sub.toFixed(2);
  updateSummary.children[4].children[1].innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);
  if (tax != 0){
    updateSummary.children[3].children[1].innerHTML = "$" + (tax * sub).toFixed(2);
  }

}

function otherPrice() {

  try {

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

    updateSummary.children[2].children[1].innerHTML = "$" + shipping.toFixed(2);
    updateSummary.children[3].children[1].innerHTML = "$" + (tax * sub).toFixed(2);

  } catch (e) {

  }

}

clickBag.addEventListener('click', openCart);
clickX.addEventListener('click', closeCart);

function openCart() {
  document.getElementById('cart').style.display = "block";
}

function closeCart() {
  document.getElementById('cart').style.display = "none";
}
