'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
/*

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
//   //promise, inorder to read the data from that response we call the jason method response
//   // method on that response method 
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

*/

//example1
// function getCountryData(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//     <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.subregion}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)}</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//             </div>
//           </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// }
// getCountryData('nigeria');
// getCountryData('ghana');
// getCountryData('cameroon');

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.subregion}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}
// function getCountryAndNeigbour(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     //GET NEIGHBOURING COUNTRY
//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//       console.log(data2);
//     });
//   });
// }

// getCountryAndNeigbour('israel');

//CREATING AN ERROR MESSAGE

const getJson = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} ${response.status}`);
    }
    return response.json();
  });
};
/*
///REFERENCE CODE///
// const getCountryData = function (country) {
//   //country1
//   const request = fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json(); //err => alert(err)
//       //json method helps to read data from the response object, it also return a
//       //promise to be handled with then
//     })
//     //this then method is the resolved value from the response promised
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;
//       //country2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}💥💥💥`);
//       renderError(`Something went wrong 💥💥${err.message}.Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
//   //the finally method get called because catch itself also return a promise
// };
const getCountryData = function (country) {
  //country1
  getJson(`https://restcountries.com/v2/name/${country}`, 'Country not fond')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('neighbour not found');
      //country2
      return getJson(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}💥💥💥`);
      renderError(`Something went wrong 💥💥${err.message}.Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
  //the finally method get called because catch itself also return a promise
};

btn.addEventListener('click', function () {
  getCountryData('000');
});
*/

////////////////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat)
 and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means
 to convert coordinates to a meaningful location, like a city and country name. 
 Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json.
 Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, 
 that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you
 recieved about the provided location. Then, using this data, log a messsage like this to the console:
  'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, 
you will get this error with code 403. This is an error with the request. Remember, 
fetch() does NOT reject the promise in this case. So create an error to reject the promise 
yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocode ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`No country found ${response.staus}.`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`${err}💥💥💥`);
      renderError(`Something went wrong ${err.message}.Try again⛔`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
});
*/

//////////////////EVENT LOOP IN PRACTICE////////////////////////
console.log(`Test start`);
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve(`Resolved promise 1`).then(res => console.log(res));

Promise.resolve(`Promise 2`).then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log(`Test end`);

//BUILDING A SIMPLE FUNCTION,////////////////
