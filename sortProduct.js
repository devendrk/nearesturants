// Set up our HTTP request
let xhr = new XMLHttpRequest();
xhr.onload = function () {
  // process return data
  if (this.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // this will run when the request is successful
      let data = JSON.parse(xhr.responseText).restaurants;
      data.forEach(cards);
    }
  } else {
    console.log("request failed");
  }
};

// create and send a GET request
xhr.open("GET", "https://cors.io/?http://www.lolnas.fi/api/restaurants.json");
xhr.send();

// Creates html elements and attributes
function createHtmlElement(element, attribute, value) {
  let el = document.createElement(element);
  el.setAttribute(attribute, value);
  return el;
}

// get root div
const root = document.querySelector("#root");
// Card container: div
let cardContainer = createHtmlElement("div", "class", "container d-flex flex-wrap justify-content-around");
root.appendChild(cardContainer);

// create the dynamic card
function cards(resturants) {
  //card: div
  let divCard = createHtmlElement("div", "class", "card bg-light  text-center mb-5 ");
  divCard.style.cssText = style = "width: 20rem;  m-4";
  cardContainer.appendChild(divCard);

  // card: header div
  let divCardHeader = createHtmlElement("div", "class", "card-header  bg-secondary text-white font-weight-bold");
  divCardHeader.textContent = resturants.name;
  divCard.appendChild(divCardHeader);

  //card: body & title div
  let divCardBody = createHtmlElement("div", "class", "card-body");
  let h5CardTitle = createHtmlElement("h5", "class", "card-title");
  h5CardTitle.textContent = "Todays Menu";
  divCard.appendChild(divCardBody);
  divCardBody.appendChild(h5CardTitle);

  // card: menu list 
  let ulCard = createHtmlElement("ul", "class", "card-text ");
  let li = createHtmlElement("li", "class", "card-text list-unstyled");
  let lunchArray = resturants.lunches;
  if (lunchArray.length > 0) {
    lunchArray.forEach(lunch => {
      li.textContent = '-  ' + lunch.title;
      ulCard.appendChild(li);
    })
  } else {
    li.textContent = 'no menus available';
    ulCard.appendChild(li);
    divCardBody.appendChild(ulCard);
  }
  divCardBody.appendChild(ulCard);

  // horizontal line 
  let hr = createHtmlElement('hr', 'class', 'mt-0');
  divCardBody.appendChild(hr);

  // get distance

  let buttonDistance = createHtmlElement('button', 'class', 'btn btn-light')
  divCardBody.appendChild(buttonDistance);
  let  _temp = 0;
  navigator.geolocation.getCurrentPosition(function (position) {
    _temp = distance(position.coords.latitude, position.coords.longitude, resturants.latitude, resturants.longitude, 'K');
    buttonDistance.textContent = _temp.toFixed(2) + ' km away';
  });

}

// calculate distance
function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(
      radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist;
  }

}

