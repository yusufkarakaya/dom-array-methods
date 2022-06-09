const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortRichestBtn = document.getElementById('sort-richest');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const deleteUsersBtn = document.getElementById('delete-users');

const main = document.getElementById('main');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Getting random user from api
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0].name;

  const newUser = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//Adding data
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Update screen
function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Add User
function addUser() {
  getRandomUser();
}

//Double Money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Show only millionaires
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
}

//Sort by richest
function sortByRichest() {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

//Calculate users money
function calculateEntireWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h2>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h2>`;
  main.appendChild(wealthEl);
}

function deleteUsers() {
  data = [];
  updateDOM();
}

//Events Listeners
addUserBtn.addEventListener('click', addUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortRichestBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateEntireWealth);
deleteUsersBtn.addEventListener('click', deleteUsers);
