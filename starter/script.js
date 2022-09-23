'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  countriesContainer.style.opacity = 1;
};
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);

  request.send();
  // console.log(request.responseText);
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    //Get neighbouring contry2

    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    // Ajax  call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryData('usa');
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

const fetchh = fetch(`https://restcountries.com/v2/name/Nigeria`);
console.log(fetchh);
