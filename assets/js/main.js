'use strict';

/* <--------------- Global Variables ---------------> */

if (document.querySelector("#order-info").className != "confirm"){
  var formData = document.forms[0].children[1].children[0];
  var formLength = document.forms[0].length - 2;
  var formType = document.forms[0].id;
}

var navPick = document.querySelector('nav').children[0];
var contButton = document.querySelector('#submit');
const qty = document.querySelectorAll('.qty');

formData.children[0].children[0].removeAttribute("hidden");
formData.children[0].children[1].removeAttribute("hidden");
contButton.setAttribute("disabled", "true");

if (formType == 'shipping-form') {
  navPick.children[1].innerHTML = "";
  navPick.children[2].innerHTML = "";
}

else if (formType == 'billing-form') {
  navPick.children[2].innerHTML = "";
}

  for (var i = 0; i < qty.length; i++) {
    qty[i].removeAttribute("hidden");
}

document.querySelector('html').className = 'js';

/* <--------------- Shipping Data Storage ---------------> */

const shipDataArr = [];

if (localStorage.localShippingData != undefined && formType == 'shipping-form') {
  for (let i = 0; i < localStorage.localShippingData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localShippingData.split(",")[i];
  }

  for (let i = 0; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i];
  }

  navPick.children[1].innerHTML = "<a href=\"billing/\">Billing</a>";
  navPick.children[2].innerHTML = "<a href=\"payment/\">Payment</a>";

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {

  }

}

try {
  var shippingFormData = document.querySelector('#shipping-form')[0].children[0];
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
    var checked = document.querySelector('#same-as-shipping').checked;
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

  if (dotIndex != atIndex + 1){
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

    var contTo = verifyData == 2;

    if (contTo == true) {
      navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>";

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
      navPick.children[2].innerHTML = "";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {

      }

      contButton.setAttribute("disabled", "true");

    }

  }

  else if (type == "billing") {

    var contTo = verifyData == 2;

    if (contTo == true) {
      navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {

      }

      localStorage.setItem("localBillingData", shipDataArr);
    }
    else {
      navPick.children[2].innerHTML = ""

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
  var billingFormData = document.querySelector('#billing-form')[0].children[0];
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

    try {
      contButton.removeAttribute("disabled");
    } catch (e) {

    }

    localStorage.setItem("localPaymentData", paymentDataArr);
  }

  else {

    try {
      contButton.removeAttribute("disabled");
    } catch (e) {

    }

    contButton.setAttribute("disabled", "true");
  }

}



/* <--------------- Shopping Cart Manipulation ---------------> */

const strPrice = document.querySelectorAll('.price');
const normPrice = [];
const updatePrice = [];
const qtyArr = [];
const priceArr = [];

var updateCart = document.querySelector('#cart');
var updateSummary = document.querySelector('#price-values');
try {
  var clickBag = document.querySelector('#bag').children[0];
  var clickX = document.querySelector('#x-button').children[0];
} catch (e) {

}
var cont = "";

var sub = 0;
var shipping = 0;
var tax = 0;

for (var i = 0; i < strPrice.length; i++) {
  priceArr[i] = parseFloat(strPrice[i].innerHTML.replace("$", ""));
}

localStorage.setItem("localNormPriceData", priceArr);

window.addEventListener('resize', displayCart)

function displayCart() {
  if (window.matchMedia('(min-width: 45em)').matches) {
    try {
      updateCart.className = 'open';
    } catch (e) {

    }
  }
}

for (let i = 0; i < strPrice.length; i++) {
  normPrice[i] = parseFloat(strPrice[i].innerHTML.replace("$", ""));
  updatePrice[i] = normPrice[i]
  sub += updatePrice[i]
}

if (localStorage.localQtyData != undefined) {
  try {
    var sub = 0;
    for (let i = 0; i < strPrice.length; i++) {
      qty[i].value = localStorage.localQtyData.split(",")[i];
      updatePrice[i] = normPrice[i] * parseInt(qty[i].value);
      strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
      sub += updatePrice[i]
    }
  } catch (e) {

  }
}

if (localStorage.localShippingData != undefined) {
  cont = localStorage.localShippingData.split(",")[2];
  otherPrice();
}

if (localStorage.localPriceData != undefined) {

  updateSummary.children[0].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[0]).toFixed(2);
  updateSummary.children[1].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[1]).toFixed(2);
  updateSummary.children[2].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[2]).toFixed(2);
  updateSummary.children[3].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[3]).toFixed(2);
}

try {
  updateCart.addEventListener('input', updateQty);
} catch (e) {

}

try {
  shippingFormData.addEventListener('input', otherPrice)
} catch (e) {

}

function updateQty() {
  sub = 0;
  for (let i = 0; i < qty.length; i++) {
    updatePrice[i] = normPrice[i] * parseInt(qty[i].value);
    strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
    qtyArr[i] = qty[i].value;
    sub += updatePrice[i]
  }

  localStorage.setItem("localQtyData", qtyArr);

  updateSummary.children[0].children[0].children[1].innerHTML = "$" + sub.toFixed(2);
  updateSummary.children[3].children[0].children[1].innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);
  if (tax != 0){
    updateSummary.children[2].children[0].children[1].innerHTML = "$" + (tax * sub).toFixed(2);
  }

}

function otherPrice() {

  const localPricesArr = []

  if (cont == "") {
    cont = document.querySelector('#shipping-form #country-name').value;
  }

  try {

    if (cont == "United States") {
      shipping = 10;
      tax = 0.08;
    }

    else if (cont == "Canada") {
      shipping = 15;
      tax = 0.10;
    }

    else if (cont == "United Kingdom") {
      shipping = 20;
      tax = 0.12;
    }

    else if (cont == "" || cont == null) {
      shipping = 0;
      tax = 0;
    }

    else {
      shipping = 30;
      tax = 0.15;
    }

    updateSummary.children[0].children[0].children[1].innerHTML = "$" + sub;

    if (tax != 0 && shipping != 0) {
      updateSummary.children[1].children[0].children[1].innerHTML = "$" + shipping.toFixed(2);
      updateSummary.children[2].children[0].children[1].innerHTML = "$" + (tax * sub).toFixed(2);
    }

    updateSummary.children[3].children[0].children[1].innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);

    localPricesArr[0] = sub;
    localPricesArr[1] = shipping;
    localPricesArr[2] = tax * sub;
    localPricesArr[3] = ((tax * sub) + sub + shipping);

    updateQty();

    localStorage.setItem("localPriceData", localPricesArr);

  } catch (e) {

  }

}

try {
  clickBag.addEventListener('click', openCart);
  clickX.addEventListener('click', closeCart);
} catch (e) {

}

function openCart() {
  updateCart.className = 'open';
}

function closeCart() {
  updateCart.className = 'closed';
}

/* <--------------- Confirm Data ---------------> */

var sections = document.querySelectorAll(".confirm");

if (document.querySelector("#order-info").className == "confirm") {

  for (var i = 0; i < sections[0].children[1].childElementCount; i++) {
    var quantity = localStorage.localQtyData.split(",")[j];

    console.log(quantity);
    sections[0].children[1].children[i].children[0].children[1].innerHTML = "Qty: " + quantity;
    sections[0].children[1].children[i].children[0].children[2].innerHTML = localStorage.localNormPriceData.split(",")[j];
  }

  for (var i = 1; i < sections.length; i++) {
    var list = sections[i].children[1];
    if (i == 1) {
      console.log("check");
      for (var j = 0; j < list.childElementCount; j++) {
        list.children[j].children[1].innerHTML = localStorage.localShippingData.split(",")[j];
      }
    }
    if (i == 2) {
      console.log("check");
      for (var j = 0; j < list.childElementCount; j++) {
        list.children[j].children[1].innerHTML = localStorage.localBillingData.split(",")[j];
      }
    }
    if (i == 3) {
      console.log("check");
      for (var j = 0; j < list.childElementCount; j++) {
        list.children[j].children[1].innerHTML = localStorage.localPaymentData.split(",")[j];
      }
    }

  }
}
