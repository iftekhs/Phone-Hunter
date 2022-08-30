// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone

// Phone detail url:
// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

const loadPhones = async (serachText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${serachText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById('phones-container');
  phonesContainer.innerHTML = '';
  // display 10 phones only
  const showAll = document.getElementById('show-all');

  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, dataLimit);
    showAll.classList.remove('d-none');
  } else {
    showAll.classList.add('d-none');
  }

  // display no phones found
  const noPhone = document.getElementById('no-found-message');

  if (phones.length === 0) {
    noPhone.classList.remove('d-none');
  } else {
    noPhone.classList.add('d-none');
  }
  // display all phoes

  phones.forEach((phone) => {
    const phoneDiv = document.createElement('div');
    console.log(phone);
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">
                    This is a longer card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                    </p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop spinner or loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  // start loader
  toggleSpinner(true);
  const searchField = document.getElementById('serach-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
  processSearch(10);
});

document.getElementById('serach-field').addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    processSearch(10);
  }
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  } else {
    loaderSection.classList.add('d-none');
  }
};

// not the best way to load showAll
document.getElementById('btn-show-all').addEventListener('click', function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
};

// loadPhones('iphone');
