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
  countriesContainer.style.opacity = 1;
}
function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
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
///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually
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
// console.log(`Test start`);
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve(`Resolved promise 1`).then(res => console.log(res));

// Promise.resolve(`Promise 2`).then(res => {
//   for (let i = 0; i < 10000000; i++) {}
//   console.log(res);
// });
// console.log(`Test end`);
/*
//////////////BUILDING A SIMPLE FUNCTION,////////////////
const lotteryPromise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve(`You WIN 💰`);
    } else {
      reject(new Error(`You lost ur money🥺`));
    }
  }, 2000);
});

//consume the promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

///////////////////PROMISIFYING SETTIMEOUT//////////////////////////////////
// most time we consume promises and we only build promises to wrapped all callback
//base asynchronous behavior into promise. (promisifying)
//////Promisifying simply means to convert callback base asynchronous behavior into promise based.
const wait = function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

wait(2)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => console.log('2 second passed'))
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

////////////////////////////////////
//reference code
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('Success').then(value => console.log(value));
Promise.reject(new Error('Declined')).catch(err => console.error(err));
*/

///////////////////PROMISIFYING THE GEOLOCATION API////////////////////////////
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.erro(err)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos.coords));

const whereAmI = function () {
  getPosition().then(position => {
    const { latitude: lat, longitude: lng } = position.coords;
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
  });
};
btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

const wait = function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('err', function () {
      reject(new Error('Image not found'));
    });
  });
};
let curImage;
createImage(`img/img-1.jpg`)
  .then(img => {
    curImage = img;
    console.log('Img 1 loaded');
    return wait(2);
  })
  .then(() => {
    curImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    curImage = img;
    console.log('Img 2 loaded');
    return wait(2);
  })
  .then(() => {
    curImage.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    curImage = img;
    console.log('Img 3 loaded');
    return wait(2);
  })
  .then(() => (curImage.style.display = 'none'))
  .catch(err => console.error(err));
 */

///////////////////////CONSUMING PROMISE WITH ASYNC/AWAIT//////////////////////////
// Since ES2017 there is a better way to consume a promise which is using async await
//async function is function that will keep running in the background while performing the
//code that is inside of it. then when the function is done it will atomatically return a promise
//async await is simply a synthatic sugar over the then method

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function (country) {
//   // const whereAmI = async function () {
//   //Geolocation
//   const position = await getPosition();
//   const { latitude: lat, longitude: lng } = position.coords;

//   //reverse geocoding
//   const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   //country data
//   const response = await fetch(
//     `https://restcountries.com/v2/name/${dataGeo.country}`
//   );
//   const data = await response.json();
//   renderCountry(data[0]);
// };
// console.log('First Test');
// whereAmI();

// const checkCount = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//     });
// };
// console.log('test again');
// checkCount('Ghana');

// ERROR HANDLING WITH TRY..CATCH
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }
/*
const whereAmI = async function () {
  try {
    {
      //Geolocation
      const position = await getPosition();
      const { latitude: lat, longitude: lng } = position.coords;

      //reverse geocoding
      const resGeo = await fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json`
      );
      if (!resGeo.ok) throw new Error('Problem getting location data');
      const dataGeo = await resGeo.json();
      // console.log(dataGeo);

      //country data
      const response = await fetch(
        `https://restcountries.com/v2/name/${dataGeo.country}`
      );
      if (!response.ok) throw new Error('Problem getting location country');
      const data = await response.json();
      renderCountry(data[0]);
      return `You are in ${dataGeo.city}, ${dataGeo.state} ${dataGeo.country}..`;//returning value from async function
    }
  } catch (err) {
    console.error(`${err} 💥💥`);
    renderError(`💥${err.message}`);


    ////Reject promise returned from async function
    throw err;
  }
};
console.log('1: will get location');

////This method seems like mixing the old way of working with promise
const city=whereAmI()
// console.log(city) this will return a pending promise and it will be pending
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2:${err.message}💥`))
//   .finally(() => console.log('3:finish getting location'));

// console.log('3: Finished getting locatio');


//convert the above code into async await function

// the best for that is using the iffy functons. iffy fx are immediately onvoke functions
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2:${city}`);
  } catch (err) {
    console.error(`2:${err.message}💥`);
  }
  console.log('3:finish getting location');
})();
///////////////////////////////////////////////////////////////////////////////////////
// const asyncv = async function () {};
// const check = asyncv();
// console.log(check);


/////////////////RETURNING PROMISES IN PARALLEL////////////////////////////////////
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJson(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJson(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v2/name/${c3}`);

    ///promise.all short circut when one promise reject
    //Whenever you have to do multiple promise at once and operation  that doesnot depend on one another
    // the yo should always run them in parallel using promise.all
    const data = await Promise.all([
      getJson(`https://restcountries.com/v2/name/${c1}`),
      getJson(`https://restcountries.com/v2/name/${c2}`),
      getJson(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('nigeria', 'canada', 'uganda');


///////////////////////////////// other Promise Combinators

//promise.race
(async function () {
  const [resp] = await Promise.race([
    getJson(`https://restcountries.com/v2/name/italy`),
    getJson(`https://restcountries.com/v2/name/ghana`),
    getJson(`https://restcountries.com/v2/name/egypt`),
  ]);
  console.log(resp);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long!`));
    }, sec * 1000);
  });
};

Promise.race([getJson(`https://restcountries.com/v2/name/ghana`), timeout(0.1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// promise.allsettled: takes in an array of simple promise and return an arry of all settled promise.
// never short circuit
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Anothers success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Anothers success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

///promise.any(): [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Anothers success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, 
this time using async/await (only the part where the promise is consumed).
 Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev
 tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// solution

const wait = function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('err', function () {
      reject(new Error('Image not found'));
    });
  });
};
// let curImage;
// createImage(`img/img-1.jpg`)
//   .then(img => {
//     curImage = img;
//     console.log('Img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     curImage = img;
//     console.log('Img 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImage.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     curImage = img;
//     console.log('Img 3 loaded');
//     return wait(2);
//   })
//   .then(() => (curImage.style.display = 'none'))
//   .catch(err => console.error(err));

// const loadNpause = async function () {
//   try {
//     let img = await createImage(`img/img-1.jpg`);
//     console.log('image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     //load 2
//     img = await createImage(`img/img-2.jpg`);
//     console.log('image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// // loadNpause();

// //part2

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     // console.log(imgs);

//     const imgEl = await Promise.all(imgs);
//     console.log(imgEl);
//     imgEl.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
