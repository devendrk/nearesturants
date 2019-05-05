const root = document.querySelector("#root");

function createHtmlElement(element, attribute, value) {
  let el = document.createElement(element);
  el.setAttribute(attribute, value);
  return el;
}

// Card container: div
let cardContainer = createHtmlElement("div", "class", "container d-flex flex-wrap");
root.appendChild(cardContainer);

function cards(element) {
  
  //card: div
  let divCard = createHtmlElement("div", "class", "card bg-light  text-center m-3");
  divCard.style.cssText = style = "width: 18rem;  m-4";
  cardContainer.appendChild(divCard);

  // card: header div
  let divCardHeader = createHtmlElement("div", "class", "card-header  bg-secondary text-white font-weight-bold");
  divCardHeader.textContent = element.name;
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
  let lunchArray = element.lunches
  if (lunchArray.length > 0) {
    lunchArray.forEach(lunch => {
      li.textContent = '-  ' + lunch.title;
      ulCard.appendChild(li)
    })
    divCardBody.appendChild(ulCard);
  } else {

    li.textContent = 'no menus available';
    ulCard.appendChild(li)
    divCardBody.appendChild(ulCard);
  }

  // horizontal line 
  let hr = createHtmlElement('hr', 'class', 'mt-0')
  divCardBody.appendChild(hr);


  // distance far
  let buttonDistance = createHtmlElement('button', 'class', 'btn btn-light')
  buttonDistance.textContent = '2.5 km '
  divCardBody.appendChild(buttonDistance)
}

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


/*================IN CASE OF ERROR LIKE BELOW==============
// ADD  THIS BEFORE URL: 'https://cors.io/?HTTP://URL
//No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://internet.derp' is therefore not allowed access.
*/
// create and send a GET request
xhr.open("GET", "https://cors.io/?http://www.lolnas.fi/api/restaurants.json");
xhr.send();
