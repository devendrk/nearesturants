const root = document.querySelector("#root");

function createHtmlElement(element, attribute, value) {
  let el = document.createElement(element);
  el.setAttribute(attribute, value);
  return el;
}

function cards(element) {
    //card: div
  let divCard = createHtmlElement("div", "class", "card bg-light mb-3");
  divCard.style.cssText = style = "max-width: 18rem;";
  root.appendChild(divCard);

  // card: header div
  let divCardHeader = createHtmlElement("div","class","card-header font-weight-bold");
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
  let li= createHtmlElement("li", "class", "card-text list-unstyled");
  let lunchArray= element.lunches
  if(lunchArray.length>0){
      lunchArray.forEach(lunch=>{
        li.textContent= lunch.title; 
        ulCard.appendChild(li)
        console.log(ulCard)
    })
    divCardBody.appendChild(ulCard);
}else{
    
    li.textContent= '';
    ulCard.appendChild(li)
    divCardBody.appendChild(ulCard);
}
//   console.log(lunchArray)
}

// Set up our HTTP request
let xhr = new XMLHttpRequest();
xhr.onload = function() {
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
