'use strict';

/* <--------------- Global Variables ---------------> */

var formData = document.forms[0].children[1].children[0];
var formLength = document.forms[0].length - 1;
var formType = document.forms[0].id;
var navPick = document.getElementById('navigation').children[0];
var contButton = document.getElementById('continue-to');

window.addEventListener('load', loadElements);

function loadElements() {
  document.querySelector('html').className = 'js';
}


/* <--------------- Shipping Data Storage ---------------> */

const shipDataArr = [];

if (localStorage.localShippingData != undefined && formType == 'shipping-form') {
  for (let i = 0; i < localStorage.localShippingData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localShippingData.split(",")[i];
  }

  for (let i = 0; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i];
  }

  navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>";
  navPick.children[2].innerHTML = "<a href=\"./payment/\">Payment</a>";
  contButton.innerHTML = "<a href=\"./billing/\">Continue to Billing</a>";

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {

  }

}

try {
  var shippingFormData = document.getElementsByName('shipping-form')[0].children[0];
} catch (e) {

}

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
    var checked = document.getElementById('same-as-shipping').checked;
  } catch (e) {

  }

  if (checked == true) {

    for (let i = 0; i < localStorage.localShippingData.split(",").length; i++) {
      shipDataArr[i] = localStorage.localShippingData.split(",")[i];

      if (shipDataArr[i] != "") {
        filledCount++;
      }

    }

    for (let i = 1; i < formLength; i++) {
      formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i-1];
      formData.children[i].children[1].setAttribute("disabled", "true");
    }

  }

  else if (checked == false) {

    for (let i = 1; i < formLength; i++) {
      shipDataArr[i-1] = formData.children[i].children[1].value;

      if (shipDataArr[i-1] != "") {
        console.log("yes");
        filledCount++;
      }
    }

    for (let i = 1; i < formLength; i++) {
      try {
        formData.children[i].children[1].removeAttribute("disabled");
      } catch (e) {

      }

    }

  }

  else {
    for (let i = 0; i < formLength; i++) {
      shipDataArr[i] = formData.children[i].children[1].value;

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

    var shippingButtonEnable = document.getElementById('to-billing');

    if (contTo == true) {
      navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>";
      contButton.innerHTML = "<a href=\"./billing/\">Continue to Billing</a>";

      if (localStorage.localBillingData != undefined) {
        navPick.children[2].innerHTML = "<a href=\"./payment/\">Payment</a>";
      }

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {

      }

      localStorage.setItem("localShippingData", shipDataArr);
    }
    else {
      navPick.children[1].innerHTML = "";
      navPick.children[2].innerHTML = ""
      contButton.innerHTML = "Continue to Billing";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {

      }

      contButton.setAttribute("disabled", "true");

    }

  }

  else if (type == "billing") {

    var contTo = filledCount == 10 && shipDataArr[7] != "" && verifyData == 2
        || filledCount == 9 && shipDataArr[7] == "" && verifyData == 2;

    var shippingButtonEnable = document.getElementById('to-payment');

    if (contTo == true) {
      navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";
      contButton.innerHTML = "<a href=\"../payment/\">Continue to Payment</a>";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {

      }

      localStorage.setItem("localBillingData", shipDataArr);
    }
    else {
      navPick.children[2].innerHTML = ""
      contButton.innerHTML = "Continue to Payment";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {

      }

      contButton.setAttribute("disabled", "true");

    }

  }

}

/* <--------------- Billing Data Storage ---------------> */
try {
  var billingFormData = document.getElementsByName('billing-form')[0].children[0];
} catch (e) {

}

if (localStorage.localBillingData != undefined && formType == 'billing-form') {
  for (let i = 0; i < localStorage.localBillingData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localBillingData.split(",")[i];
  }

  for (let i = 1; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i-1];
  }

  navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";
  contButton.innerHTML = "<a href=\"../payment/\">Continue to Payment</a>";

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {

  }

}

try {
  billingFormData.addEventListener('input', fillBillingForm);
} catch (e) {

}

function fillBillingForm() {
  var a = shpData("billing");
}

/* <--------------- Payment Data Storage ---------------> */

const paymentDataArr = [];

try {
  var paymentFormData = document.getElementsByName('payment-form')[0].children[0];
} catch (e) {

}

if (localStorage.localPaymentData != undefined && formType == 'payment-form') {
  for (let i = 0; i < localStorage.localPaymentData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localPaymentData.split(",")[i];
  }

  for (let i = 0; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localPaymentData.split(",")[i];
  }

  contButton.innerHTML = "<a href=\"../\">Confirm Order</a>";

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {

  }

}

try {
  paymentFormData.addEventListener('input', payData);
} catch (e) {

}

function payData() {
  var filledCount = 0;

  for (let i = 0; i < formLength; i++) {
    paymentDataArr[i] = formData.children[i].children[1].value;

    if (paymentDataArr[i] != "") {
      filledCount++;
    }
  }

  if (paymentDataArr[0].length >= 13 && paymentDataArr[0].length <= 19 &&
      paymentDataArr[1].length == 4 && paymentDataArr[2].length >= 3 &&
      paymentDataArr[2].length <= 4 && filledCount == 4) {
    contButton.innerHTML = "<a href=\"../confirm\">Continue to Confirmation Page</a>";

    try {
      contButton.removeAttribute("disabled");
    } catch (e) {

    }

    localStorage.setItem("localPaymentData", paymentDataArr);
  }

  else {
    contButton.innerHTML = "Confirm Order";

    try {
      contButton.removeAttribute("disabled");
    } catch (e) {

    }

    contButton.setAttribute("disabled", "true");
  }

}



/* <--------------- Shopping Cart Manipulation ---------------> */

const strPrice = document.getElementsByClassName('price');
const normPrice = [];
const updatePrice = [];
const qtyArr = [];
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

if (localStorage.localQtyData != undefined) {
  for (let i = 0; i < strPrice.length; i++) {
    qty[i].value = localStorage.localQtyData.split(",")[i];
    updatePrice[i] = normPrice[i] * parseInt(qty[i].value);
    strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
    sub += updatePrice[i]
  }
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
    updatePrice[i] = normPrice[i] * parseInt(qty[i].value);
    strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
    qtyArr[i] = qty[i].value;
    sub += updatePrice[i]
  }

  localStorage.setItem("localQtyData", qtyArr);

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
