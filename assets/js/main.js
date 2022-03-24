'use strict';

/* <--------------- Global Variables ---------------> */

var navPick = document.querySelector('nav').children[0];
var contButton = document.querySelector('#submit');
var confirmPage = document.querySelector("#order-info").className;
var qty = document.querySelectorAll('.qty');
var formData = "";
var formLength = "";
var formType = "";
var shippingFormData = "";
var billingFormData = "";
var paymentFormData = "";
var strPrice = document.querySelectorAll('.price');
var updateCart = document.querySelector('#cart');
var updateSummary = document.querySelector('#price-values');
var clickBag = "";
var clickX = "";
var cont = "";
var sub = 0;
var shipping = 0;
var tax = 0;
var sections = document.querySelectorAll(".confirm");
var quantity = "";
var list = "";
var processed = "";
var save = "";
var i = 0;
var j = 0;
var shipDataArr = [];
var paymentDataArr = [];
var normPrice = [];
var updatePrice = [];
var qtyArr = [];
var priceArr = [];
var localPricesArr = [];


contButton.setAttribute("disabled", "true");

if (confirmPage !== "confirm") {
  formData = document.forms[0].children[1].children[0];
  formLength = document.forms[0].length - 2;
  formType = document.forms[0].id;

} else {
  contButton.removeAttribute("disabled");
}

if (formType === 'shipping-form') {
  navPick.children[1].innerHTML = "";
  navPick.children[2].innerHTML = "";

} else if (formType === 'billing-form') {
  navPick.children[2].innerHTML = "";
  formData.children[0].children[0].removeAttribute("hidden");
  formData.children[0].children[1].removeAttribute("hidden");
  formData.children[0].setAttribute("aria-hidden", "false");
}

for (i = 0; i < qty.length; i++) {
  qty[i].removeAttribute("hidden");
}

document.querySelector('html').className = 'js';

if (formType === "payment-form") {
  document.querySelector("#payment-form").setAttribute("action", "../confirm/");
}


/* <--------------- Shipping Data Storage ---------------> */

if (typeof(localStorage.localShippingData) === "string" && formType === 'shipping-form') {
  for (i = 0; i < localStorage.localShippingData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localShippingData.split(",")[i];
  }

  for (i = 0; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i];
  }

  navPick.children[1].innerHTML = "<a href=\"billing/\">Billing</a>";
  navPick.children[2].innerHTML = "<a href=\"payment/\">Payment</a>";

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {
    console.log("Could not disable button");
  }

}

try {
  shippingFormData = document.querySelector('#shipping-form')[0].children[0];
} catch (e) {
  console.log("Could not set shippingFormData variables");
}

try {
  shippingFormData.addEventListener('input', fillShippingForm);
} catch (e) {
  console.log("Could not addEventListener to shippingFormData variables");
}

function fillShippingForm() {
  var a = shpData("shipping");
  console.log(a + "form is active");
}

function shpData(x) {
  var type = x;
  var filledCount = 0;
  var verifyData = 0;
  var checked = "";
  var atIndex = shipDataArr[1].indexOf("@");
  var dotIndex = shipDataArr[1].indexOf(".");
  var phoneNumber = parseInt(shipDataArr[9]);

  try {
    checked = document.querySelector('#same-as-shipping').checked;
  } catch (e) {
    console.log("Could not set the checked variable");
  }

  if (checked === true) {

    for (i = 0; i < localStorage.localShippingData.split(",").length; i++) {
      shipDataArr[i] = localStorage.localShippingData.split(",")[i];

      if (shipDataArr[i] !== "") {
        filledCount++;
      }

    }

    for (i = 1; i < formLength; i++) {
      formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i-1];
      formData.children[i].children[1].setAttribute("disabled", "true");
    }

  } else if (checked === false) {

    for (i = 1; i < formLength; i++) {
      shipDataArr[i-1] = formData.children[i].children[1].value;
    }

    for (i = 1; i < formLength; i++) {
      try {
        formData.children[i].children[1].removeAttribute("disabled");
      } catch (e) {
        console.log("Could not enable button");
      }
    }
  } else {

    for (i = 0; i < formLength; i++) {
      shipDataArr[i] = formData.children[i].children[1].value;

      if (shipDataArr[i] !== "") {
        filledCount++;
      }
    }
  }

  if (dotIndex !== atIndex + 1){
    verifyData++;
  } else {
    verifyData = 0;
  }

  if (phoneNumber.toString().length === 10) {
    shipDataArr[9] = phoneNumber;
    verifyData++;
  } else {
    verifyData = 0;
  }

  console.log(filledCount);

  if(type === "shipping") {

    if (verifyData === 2) {
      navPick.children[1].innerHTML = "<a href=\"./billing/\">Billing</a>";

      if (typeof(localStorage.localBillingData) === "string") {
        navPick.children[2].innerHTML = "<a href=\"./payment/\">Payment</a>";
      }

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {
        console.log("Could not enable button");
      }

      localStorage.setItem("localShippingData", shipDataArr);
    } else {
      navPick.children[1].innerHTML = "";
      navPick.children[2].innerHTML = "";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {
        console.log("Could not enable button");
      }

      contButton.setAttribute("disabled", "true");

    }

  } else if (type === "billing") {

    if (verifyData === 2) {
      navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {
        console.log("Could not enable button");
      }

      localStorage.setItem("localBillingData", shipDataArr);
    } else {
      navPick.children[2].innerHTML = "";

      try {
        contButton.removeAttribute("disabled");
      } catch (e) {
        console.log("Could not enable button");
      }

      contButton.setAttribute("disabled", "true");

    }

  }

}

/* <--------------- Billing Data Storage ---------------> */
try {
  billingFormData = document.querySelector('#billing-form')[0].children[0];
} catch (e) {
  console.log("Could not set billingFormData variables");
}

if (typeof(localStorage.localBillingData) === "string" && formType === 'billing-form') {
  for (i = 0; i < localStorage.localBillingData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localBillingData.split(",")[i];
  }

  for (i = 1; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localShippingData.split(",")[i-1];
  }

  navPick.children[2].innerHTML = "<a href=\"../payment/\">Payment</a>";

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {
    console.log("Could not enable button");
  }

}

try {
  billingFormData.addEventListener('input', fillBillingForm);
} catch (e) {
  console.log("Could addEventListener to billingFormData variables");
}

function fillBillingForm() {
  var b = shpData("billing");
  console.log(b + "form is active");
}

/* <--------------- Payment Data Storage ---------------> */

try {
  paymentFormData = document.getElementsByName('payment-form')[0].children[0];
} catch (e) {
  console.log("Could not set paymentFormData variables");
}

if (typeof(localStorage.localPaymentData) === "string" && formType === 'payment-form') {
  for (i = 0; i < localStorage.localPaymentData.split(",").length; i++) {
    shipDataArr[i] = localStorage.localPaymentData.split(",")[i];
  }

  for (i = 0; i < formLength; i++) {
    formData.children[i].children[1].value = localStorage.localPaymentData.split(",")[i];
  }

  try {
    contButton.removeAttribute("disabled");
  } catch (e) {
    console.log("Could not set paymentFormData variables");
  }

}

try {
  paymentFormData.addEventListener('input', payData);
} catch (e) {
  console.log("Could not addEventListener to billingFormData variables");
}

function payData() {
  var filledCount = 0;

  for (i = 0; i < formLength; i++) {
    paymentDataArr[i] = formData.children[i].children[1].value;

    if (paymentDataArr[i] !== "") {
      filledCount++;
    }
  }

  if (paymentDataArr[0].length >= 13 && paymentDataArr[0].length <= 19 &&
      paymentDataArr[1].length === 4 && paymentDataArr[2].length >= 3 &&
      paymentDataArr[2].length <= 4 && filledCount === 4) {

    try {
      contButton.removeAttribute("disabled");
    } catch (e) {
      console.log("Could not enable button");
    }

    localStorage.setItem("localPaymentData", paymentDataArr);
  } else {

    try {
      contButton.removeAttribute("disabled");
    } catch (e) {
      console.log("Could not enable button");
    }

    contButton.setAttribute("disabled", "true");
  }

}

/* <--------------- Shopping Cart Manipulation ---------------> */
try {
  clickBag = document.querySelector('#bag').children[0];
  clickX = document.querySelector('#x-button').children[0];
  updateCart.setAttribute("aria-hidden", "true");
} catch (e) {
  console.log("Could not load button variables");
}

if (confirmPage !== "confirm") {
  for (i = 0; i < strPrice.length; i++) {
    priceArr[i] = parseFloat(strPrice[i].innerHTML.replace("$", ""));
  }
  localStorage.setItem("localNormPriceData", priceArr);
}

window.addEventListener('resize', displayCart);

function displayCart() {
  if (window.matchMedia('(min-width: 45em)').matches) {
    try {
      updateCart.setAttribute("aria-hidden", "false");
      updateCart.className = 'open';
    } catch (e) {
      console.log("Could not open cart");
    }
  }
}

for (i = 0; i < strPrice.length; i++) {
  normPrice[i] = parseFloat(strPrice[i].innerHTML.replace("$", ""));
  updatePrice[i] = normPrice[i];
  sub += updatePrice[i];
}

if (typeof(localStorage.localQtyData) === "string" && confirmPage !== "confirm") {
  try {
    sub = 0;
    for (i = 0; i < strPrice.length; i++) {
      qty[i].value = localStorage.localQtyData.split(",")[i];
      updatePrice[i] = normPrice[i] * parseInt(qty[i].value);
      strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
      sub += updatePrice[i];
    }
  } catch (e) {
    console.log("Could not update prices");
  }
}

if (typeof(localStorage.localShippingData) === "string") {
  cont = localStorage.localShippingData.split(",")[2];
  otherPrice();
}

if (typeof(localStorage.localShippingData) === "string") {

  updateSummary.children[0].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[0]).toFixed(2);
  updateSummary.children[1].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[1]).toFixed(2);
  updateSummary.children[2].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[2]).toFixed(2);
  updateSummary.children[3].children[0].children[1].innerHTML = "$" + parseFloat(localStorage.localPriceData.split(",")[3]).toFixed(2);
}

try {
  updateCart.addEventListener('input', updateQty);
} catch (e) {
  console.log("Could not addEventListener to the cart");
}

try {
  shippingFormData.addEventListener('input', otherPrice);
} catch (e) {
  console.log("Could not addEventListener to shippingFormData");
}

function updateQty() {

  if (confirmPage !== "confirm") {
    sub = 0;
    for (i = 0; i < qty.length; i++) {
      updatePrice[i] = normPrice[i] * parseInt(qty[i].value);
      strPrice[i].innerHTML = "$" + updatePrice[i].toFixed(2);
      qtyArr[i] = qty[i].value;
      sub += updatePrice[i];
    }

    localStorage.setItem("localQtyData", qtyArr);

    updateSummary.children[0].children[0].children[1].innerHTML = "$" + sub.toFixed(2);
    updateSummary.children[3].children[0].children[1].innerHTML = "$" + ((tax * sub) + sub + shipping).toFixed(2);
    if (tax !== 0){
      updateSummary.children[2].children[0].children[1].innerHTML = "$" + (tax * sub).toFixed(2);
    }
  }

}

function otherPrice() {

  if (confirmPage !== "confirm") {
    localPricesArr = [];

    if (cont === "") {
      cont = document.querySelector('#shipping-form #country-name').value;
    }

    try {

      if (cont === "United States") {
        shipping = 10;
        tax = 0.08;

      } else if (cont === "Canada") {
        shipping = 15;
        tax = 0.10;

      } else if (cont === "United Kingdom") {
        shipping = 20;
        tax = 0.12;

      } else if (cont === "" || cont === null) {
        shipping = 0;
        tax = 0;

      } else {
        shipping = 30;
        tax = 0.15;
      }

      updateSummary.children[0].children[0].children[1].innerHTML = "$" + sub;

      if (tax !== 0 && shipping !== 0) {
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
      console.log("Could not update prices");
    }
  }

}

try {
  clickBag.addEventListener('click', openCart);
  clickX.addEventListener('click', closeCart);
} catch (e) {
  console.log("Could not addEventListener to buttons");
}

function openCart() {
  updateCart.setAttribute("aria-hidden", "false");
  updateCart.className = 'open';
}

function closeCart() {
  updateCart.setAttribute("aria-hidden", "true");
  updateCart.className = 'closed';
}

/* <--------------- Confirm Data ---------------> */

if (document.querySelector("#order-info").className === "confirm") {

  for (i = 0; i < sections[0].children[1].childElementCount; i++) {
    quantity = localStorage.localQtyData.split(",")[i];

    console.log(quantity);
    sections[0].children[1].children[i].children[0].children[1].innerHTML = "Qty: " + quantity;
    sections[0].children[1].children[i].children[0].children[2].innerHTML = "$" + localStorage.localNormPriceData.split(",")[i];
  }

  for (i = 1; i < sections.length; i++) {
    list = sections[i].children[1];
    if (i === 1) {
      console.log("check");
      for (j = 0; j < list.childElementCount; j++) {
        list.children[j].children[1].innerHTML = localStorage.localShippingData.split(",")[j];
      }
    }
    if (i === 2) {
      console.log("check");
      for (j = 0; j < list.childElementCount; j++) {
        list.children[j].children[1].innerHTML = localStorage.localBillingData.split(",")[j];
      }
    }
    if (i === 3) {
      console.log("check");
      for (j = 0; j < list.childElementCount; j++) {
        list.children[j].children[1].innerHTML = localStorage.localPaymentData.split(",")[j];
      }
    }
  }
}

/* <--------------- Processed Data ---------------> */

processed = document.querySelector("#processed input");
save = document.querySelector("#check-to-fail");

try {
  processed.addEventListener('click', processData);
} catch (e) {

}

function processData() {
  console.log("This is where data would be sent to the remote server to be verified and saved.")
  if (save === true) {
    console.log("Customer data was successfully saved");
    localStorage.clear();
    document.querySelector("#processed").setAttribute("action", "../processed/");
  }

  else {
    console.log("Failed to save Customer data")
    document.querySelector("#processed").setAttribute("action", "../failed/");
  }
}
