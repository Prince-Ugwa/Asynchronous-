'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${+data.population}</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
              <p class="country__row"><span>💰</span>${data.callingCodes}</p>
            </div>
  
          </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
//////XML httpReqest
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);

//   request.send();
//   // console.log(request.responseText);
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${+data.population}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//             <p class="country__row"><span>💰</span>${data.callingCodes}</p>
//           </div>

//         </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('Nigeria');
// getCountryData('Ghana');
// getCountryData('usa');
/////////////////////////////////////////////////////
///////////////////////CALL BACK HELL/////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);

//   request.send();
//   // console.log(request.responseText);
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     //Get neighbouring contry2

//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;

//     // Ajax  call 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryData('usa');
// getCountryData('Ghana');
// getCountryData('usa');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//     });
//   }, 1000);
// }, 1000);

/////////////////////PROMISE AND FETCH API//////////////////
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);

// request.send();

// const fetchh = fetch(`https://restcountries.com/v2/name/Nigeria`);
// console.log(fetchh);

///////////////////////Fetch data using a promise////////////////////////

// const getCountryData = function (country) {
//   //the first step is the fetch method returning a promise and we use the then method to handle the
//   //promise using the then method, inorder to read the data from that response we then call the jason method response
//   // methon on that response metho
//   fetch(`https://restcountries.com/v2/name/ ${country}`)
//     //this will also return a new promise that we need to handle
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/ ${country}`)
//     .then(function (response) {

//       return response.json();
//     })
//     .then(function (data) {

//       renderCountry(data[0]);
//     });
// };
// getCountryData('Nigeria');

///////////Modifying the code///////////////////////////
const getJason = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       // country2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     //th catch method will be call when the promise is rejected
//     .catch(err => {
//       renderError(`something went wrong 💥💥💥 ${err.message} try again! `);
//     })
//     //the finally methd works because the methd right above it return a promise
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJason(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      // const neighbour = '101';
      if (!neighbour) throw new Error('No neighbouring country found');

      // country2
      return getJason(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    //th catch method will be call when the promise is rejected
    .catch(err => {
      renderError(`something went wrong 💥💥💥 ${err.message} try again! `);
    })
    //the finally method works because the method right above it return a promise
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', () => {
  // getCountryData('Nigeria');
  getCountryData('nigeria');
});
