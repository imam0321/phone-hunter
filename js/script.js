// Load Phones
const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
// Display Phones
const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  // show all button
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 5) {
    phones = phones.slice(0, 5);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // display no phone Worning message
  const noPhone = document.getElementById("no-phone-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // Stop spinner
  toggleSpinner(false);
};
// Search Phones
const processSearch = (dataLimit) => {
  // Start spinner
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// Search btn handle
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(5);
});

// Search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(5);
    }
  });

const toggleSpinner = (isLoader) => {
  const loaderSection = document.getElementById("loader");
  if (isLoader) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

// loadPhones("iphone");
