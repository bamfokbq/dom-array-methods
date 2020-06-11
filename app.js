const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
// FETCH RANDOM USERS AND WEALTH
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addUser(newUser);
}

// ADD USER FUNCTION
function addUser(userObj) {
  data.push(userObj);

  updateDOM();
}

// DOUBLE THE MONEY
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}
// SORT BY RICHEST
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}
// FILTER MILLIONAIRES
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDOM();
}
// CALCULATE THE TOTAL WEALTH
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthElement);
}
// UPDATE THE DOME
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

// FORMAT NUMBER AS MONEY
function formatMoney(money) {
  const currency = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return '$' + currency;
}

// EVENT LISTENERS
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
