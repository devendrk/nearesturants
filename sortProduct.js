const root = document.querySelector('#root');

function createHtmlElement(element,attribute,value){
    let  el = document.createElement(element);
    el.setAttribute(attribute,value);
    return el;  
}
// Set up our HTTP request
let xhr = new XMLHttpRequest();
xhr.onload = function(){
    // process return data
    if(this.readyState===4){
        if(xhr.status>=200 && xhr.status <300){
            // this will run when the request is successful
            let data = JSON.parse(xhr.responseText).restaurants;
            data.forEach(element => {
                // console.log(element.name
                let divCard = createHtmlElement('div','class','card bg-light mb-3')
            divCard.style.cssText =  style="max-width: 18rem;"; 
            let divCardHeader = createHtmlElement('div','class','card-header font-weight-bold');
            divCardHeader.textContent = element.name;
            let divCardBody = createHtmlElement('div','class','card-body');
            let pCardText = createHtmlElement('p','class','card-text ');
            pCardText.textContent = 'this will be dynamic list of meal'
            divCardBody.appendChild(pCardText);
            divCard.appendChild(divCardHeader);
            divCard.appendChild(divCardBody);
            root.appendChild(divCard);

            });
            console.log(data[0].name)
            
        }
    }else {
        console.log('request failed');
    }

    console.log('this will awlays runs');
}

// create and send a GET request

//================IN CASE OF ERROR LIKE BELOW==============
// ADD  THIS BEFORE URL: 'https://cors.io/?HTTP://URL
//No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://internet.derp' is therefore not allowed access.


xhr.open('GET','https://cors.io/?http://www.lolnas.fi/api/restaurants.json');
xhr.send();
