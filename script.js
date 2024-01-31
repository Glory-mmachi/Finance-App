"use strict";

let balanceEl = document.querySelector("#balance");
let addTransactionBtnEl = document.querySelector("#add-transaction");
let incomeEl = document.querySelector("#income");
let expenseEl = document.querySelector("#expense");
let descriptionEl = document.querySelector("#description");
let amountEl = document.querySelector("#amount");
let formEl = document.querySelector("#form");
let listEl = document.querySelector("#list");
let deleteBtn = document.querySelector(".delete-btn");

// transaction history
// let transactions = [];

//1 function to store data in localstorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// 2 get item from local storage
let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

init();
//new transaction
function addTransaction(e) {
  e.preventDefault();
  if (
    descriptionEl.value.trim() === "" ||
    amountEl.value.trim() === "" ||
    isNaN(amountEl.value)
  ) {
    alert("Enter valid description and amount");
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 1000000000000000),
      description: descriptionEl.value,
      amount: +amountEl.value,
    };
    transactions.push(transaction);
    displayTransaction(transaction);
    UpdateValues();

    // 3 update localstore
    updateLocalStorage();
    descriptionEl.value = "";
    amountEl.value = "";
  }
}

//Display transaction
function displayTransaction(transaction) {
  let item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.description} <span>${transaction.amount}</span> <button class="delete-btn" onClick='removeTransaction(${transaction.id})'>x</button>`;
  listEl.appendChild(item);
}

// Update values
function UpdateValues() {
  let amount = transactions.map((x) => x.amount);
  let total = amount.reduce((acc, cur) => acc + cur, 0).toFixed(2);
  balanceEl.innerHTML = `&#8358; ${total}`;

  let incomeTotal = amount
    .filter((x) => x > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  incomeEl.innerHTML = `&#8358; ${incomeTotal}`;
  let expenseTotal = amount
    .filter((x) => x < 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  expenseEl.innerHTML = `&#8358; ${Math.abs(expenseTotal)}`;
}

//delete item
function removeTransaction(id) {
  transactions = transactions.filter((x) => x.id !== id);

  // 4 update local storage when utem is deleted
  updateLocalStorage();
  init();
}
function init() {
  listEl.innerHTML = "";
  transactions.forEach(displayTransaction);
  UpdateValues();
}

formEl.addEventListener("submit", addTransaction);
