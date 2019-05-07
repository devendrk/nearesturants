document.addEventListener('DOMContentLoaded', function (event) {
	executeScripts();
});

// Creates html elements and attributes 
function createHtmlElement(element, attribute, value) {
	let el = document.createElement(element);
	el.setAttribute(attribute, value);
	return el;
}

// create the dynamic card
function renderRestaurantCards(resturants) {
	const NO_MENUS_AVAILABLE = 'no menus available';
	const KM_AWAY = ' km away';
	const TODAY_LUNCH = 'Todays Lunch';

	let cardContainer = document.getElementById('card-container'),
		divCard = createHtmlElement('div', 'class', 'card bg-light  text-center mb-5 '); //card: div
	
	// hmmm??
	// divCard.style.cssText = style = 'width: 20rem;  m-4';
	divCard.style.width = '20rem';
	cardContainer.appendChild(divCard);

	// card: header div
	let divCardHeader = createHtmlElement('a', 'class', 'card-header  bg-secondary text-white font-weight-bold');

	divCardHeader.href = resturants.url;
	divCardHeader.innerText = resturants.name;
	divCard.appendChild(divCardHeader);

	//card: body & title div
	let divCardBody = createHtmlElement('div', 'class', 'card-body'),
		h5CardTitle = createHtmlElement('h5', 'class', 'card-title');

	h5CardTitle.innerText = TODAY_LUNCH;
	divCard.appendChild(divCardBody);
	divCardBody.appendChild(h5CardTitle);

	// card: menu list 
	let ulCard = createHtmlElement('ul', 'class', 'card-text '),
		li = createHtmlElement('li', 'class', 'card-text list-unstyled'),
		lunchArray = resturants.lunches ? resturants.lunches : []; // just in case there is no lunch property defined

	lunchArray.forEach(lunch => {
		// li.innerText = '-  ' + lunch.title; 
		li.innerText = lunch.title; 
		ulCard.appendChild(li);
	});

	if (lunchArray.length === 0) {
		li.innerText = NO_MENUS_AVAILABLE;
		ulCard.appendChild(li);
		divCardBody.appendChild(ulCard);
	}

	divCardBody.appendChild(ulCard);

	// horizontal line 
	let hr = createHtmlElement('hr', 'class', 'mt-0');
	divCardBody.appendChild(hr);

	// get distance
	let buttonDistance = createHtmlElement('button', 'class', 'btn btn-light');
	buttonDistance.addEventListener('click', function(){
		window.location = '//maps.google.com/?q=' + resturants.latitude + ',' + resturants.longitude;
	});

	divCardBody.appendChild(buttonDistance);
	let _temp = 0;
	navigator.geolocation.getCurrentPosition(function (position) {
		_temp = distance(position.coords.latitude, position.coords.longitude, resturants.latitude, resturants.longitude);
		buttonDistance.innerText = _temp.toFixed(2) + KM_AWAY;
	});

}

// calculate distance
function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	} else {
		let radlat1 = Math.PI * lat1 / 180,
			radlat2 = Math.PI * lat2 / 180,
			theta = lon1 - lon2,
			radtheta = Math.PI * theta / 180,
			dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

		dist = dist > 1 ? 1 : dist;
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344

		return dist;
	}

}

//  search Resturants
function searchResturantsByName(data) {
	let inputText = document.querySelector('#search-input'),
		inputSearchValue = inputText.value.toLowerCase(),
		filterData = data.filter(resturant => resturant.name.toLowerCase().includes(inputSearchValue)),
		cardContainerDivId = document.querySelector('#card-container');

	cardContainerDivId.innerHTML = '';
	if (filterData.length > 0) {
		filterData.forEach(renderRestaurantCards);
		inputText.value = '';
	} else {
		cardContainerDivId.innerHTML = '<span style="color: red;">OOPs !  <br> cant find resturant, Pleas try another name.</span>'
	}
	return filterData;

}

function executeScripts() {	
	const ROOT = document.querySelector('#root'); // get root div	
	let cardContainer = createHtmlElement('div', 'class', 'container d-flex flex-wrap justify-content-around'); // Card container: div
	
	cardContainer.setAttribute('id', 'card-container');
	ROOT.appendChild(cardContainer);
	
	// Set up our HTTP request
	let resturants = []
	let xhr = new XMLHttpRequest();

	xhr.onload = function () {
		// process return data
		if (this.readyState === 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				// this will run when the request is successful
				let data = JSON.parse(xhr.responseText);

				// Be careful if the response somehow doesn't turn out as expected
				if (!data.restaurants) {
					return;
				}

				resturants = data.restaurants;
				// why do you iterate on data object if you have assigned it to resturant?
				// data.forEach(renderRestaurantCards);

				resturants.forEach(renderRestaurantCards);
			}
		} else {
			// log the error status text helps you with debugging
			console.log('Request failed with code: ' + xhr.statusText);
		}
	};

	// create and send a GET request
	xhr.open('GET', 'https://cors.io/?http://www.lolnas.fi/api/restaurants.json');
	xhr.send();
}