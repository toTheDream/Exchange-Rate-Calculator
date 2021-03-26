'use strict';

const currencyEl_one = document.querySelector('#currency-one');
const currencyEl_two = document.querySelector('#currency-two');
const amountEL_one = document.querySelector('#amount-one');
const amountEL_two = document.querySelector('#amount-two');

const rateEl = document.querySelector('#rate');
const swap = document.querySelector('#swap');

// Fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/b8a58ee94ebbe5eaf2f44ba6/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      //   console.log(data);
      const rate = data['conversion_rates'][currency_two];
      rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEL_two.value = (amountEL_one.value * rate).toFixed(2);
    });
}

function swapElements() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
amountEL_two.addEventListener('input', calculate);

swap.addEventListener('click', swapElements);

calculate();
