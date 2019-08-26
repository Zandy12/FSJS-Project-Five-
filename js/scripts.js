/***************
 *  VARIABLES
 ***************/

const gallery = document.getElementById('gallery');
let modalArray = new Array();
let modalStrong = new Array();

/***************
 *  FUNCTIONS
 ***************/

// Fetch API getting data from the Random User Generator API.
function fetchData(url) {
    return fetch(url)
             .then(checkStatus)
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem', error))
}

// Checks for status regarding connection to the server.
function checkStatus(response) {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
}

// Generates the markup for each random individual's user information and how it is to be displayed on the DOM.
function generateCardImgContainer(w, x, y, z) {
    const cardImgContainer = document.createElement('div');
    cardImgContainer.setAttribute('class','card-img-container');

    const cardImg = document.createElement('img');
    cardImg.setAttribute('class','card-img');
    cardImg.setAttribute('src',w);
    cardImg.setAttribute('alt','profile picture');
    cardImgContainer.appendChild(cardImg);

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.setAttribute('class','card-info-container');

    const name = document.createElement('h3');
    name.setAttribute('id','name');
    name.setAttribute('class','card-name cap');
    name.appendChild(document.createTextNode(x));
    cardInfoContainer.appendChild(name);
    
    const cardText = document.createElement('p');
    cardText.setAttribute('class','card-text');
    cardText.appendChild(document.createTextNode(y));
    cardInfoContainer.appendChild(cardText);
    
    const cardTextCap = document.createElement('p');
    cardTextCap.setAttribute('class','card-text cap');
    cardTextCap.appendChild(document.createTextNode(z));
    cardInfoContainer.appendChild(cardTextCap);
    
    const card = document.createElement('div');
    card.setAttribute('class','card');
    card.appendChild(cardImgContainer);
    card.appendChild(cardInfoContainer);
    
    gallery.appendChild(card);
}

// Generates invdividual modals for each random generation user information.
function generateModalContainer(t,u,v,w,x,y) {

    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('class','modal-container');

    const modal = document.createElement('div');
    modal.setAttribute('class','modal');
    modalContainer.appendChild(modal);

    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.setAttribute('class','modal-close-btn');
    modalCloseBtn.setAttribute('id','modal-close-btn');
    modal.appendChild(modalCloseBtn);

    const strong = document.createElement('strong');
    strong.appendChild(document.createTextNode('X'));
    modalCloseBtn.appendChild(strong);

    const modalInfoContainer = document.createElement('div');
    modalInfoContainer.setAttribute('class','modal-info-container');
    modal.appendChild(modalInfoContainer);

    const modalImg = document.createElement('img');
    modalImg.setAttribute('class','modal-img');
    modalImg.setAttribute('src', t); // picture
    modalImg.setAttribute('alt','profile picture');
    modalInfoContainer.appendChild(modalImg);
    
    const modalName = document.createElement('h3');
    modalName.setAttribute('class','modal-name cap');
    modalName.setAttribute('id','name');
    modalName.appendChild(document.createTextNode(u)); // name 
    modalInfoContainer.appendChild(modalName);
    
    const modalText1 = document.createElement('p');
    modalText1.setAttribute('class','modal-text');
    modalText1.appendChild(document.createTextNode(v)); // email
    modalInfoContainer.appendChild(modalText1);
    
    const modalText2 = document.createElement('p');
    modalText2.setAttribute('class','modal-text cap');
    modalText2.appendChild(document.createTextNode(w)); // city 
    modalInfoContainer.appendChild(modalText2);
    
    const hr = document.createElement('hr');
    modalInfoContainer.appendChild(hr);
    
    const modalText3 = document.createElement('p');
    modalText3.setAttribute('class','modal-text');
    modalText3.appendChild(document.createTextNode(x)); // phone
    modalInfoContainer.appendChild(modalText3);
    
    const modalText4 = document.createElement('p');
    modalText4.setAttribute('class','modal-text cap');
    modalText4.appendChild(document.createTextNode(y)); // location
    modalInfoContainer.appendChild(modalText4);

    modal.appendChild(modalInfoContainer);
    document.body.appendChild(modalContainer);
    modalContainer.style.display = 'none';
    modalArray.push(modalContainer);
    modalStrong.push(modalCloseBtn);
}

/*************************
 *  FOR LOOP AND TIMEOUT
 *************************/

// Use for loop to append random employees via AJAX request to parse data from JSON with the Fetch API.
for (let i = 0; i < 12; i++) {
    Promise.all([
        fetchData('https://randomuser.me/api/'),
    ])
        .then(data => {
        const picture = data[0].results[0].picture.large; // large, medium, thumbnail
        const firstName = data[0].results[0].name.first;
        const lastName = data[0].results[0].name.last;
        const fullName = firstName + " " + lastName;
        const email = data[0].results[0].email;
        const city = data[0].results[0].location.city;
        const phone = data[0].results[0].phone;
        const address = data[0].results[0].location.street + ", " + data[0].results[0].location.state + ", " + data[0].results[0].location.postcode;
        generateCardImgContainer(picture, fullName, email, city);
        generateModalContainer(picture, fullName, email, city, phone, address);
    })
}

// Credit: innocentDrifter. Source: https://stackoverflow.com/questions/28583897/htmlcollection-item-function-returns-null.
setTimeout(() => {
    const cards = document.getElementsByClassName('card');
    for (let i = 0 ; i < 12 ; ++i) {
        cards.item(i).addEventListener('click', function() {
            modalArray[i].style.display = "block";
            modalStrong[i].addEventListener('click', function() {
                modalArray[i].style.display = "none";
            });
        });
    }
  }, 2000);