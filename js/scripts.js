/***************
 *   CLASSES
 ***************/

class Arrays {
    constructor(modalArray, modalStrong, fetchArray) {
        this.modalArray = modalArray;
        this.modalStrong = modalStrong;
        this.fetchArray = fetchArray;
    }
}

/***************
 *  VARIABLES
 ***************/

const gallery = document.getElementById('gallery');
const array = new Arrays(new Array(), new Array(), new Array());
let modalsExist = false;

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
    const card = document.createElement('div');
    card.setAttribute('class','card');
    card.innerHTML = `<div class=\"card-img-container\"><img class=\"card-img\" src=\"${w}\" alt=\"profile picture\"></div><div class=\"card-info-container\"><h3 id=\"name\" class=\"card-name cap\">${x}</h3><p class=\"card-text\">${y}</p><p class=\"card-text cap\">${z}</p></div>`;
    
    gallery.appendChild(card);
}

// Generates invdividual modals for each random generation user information.
function generateModalContainer(t,u,v,w,x,y) {
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('class','modal-container');

    modalContainer.innerHTML = `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button><div class="modal-info-container"><img class="modal-img" src="${t}" alt=""profile picture"><h3 id="name" class="modal-name cap">${u}</h3><p class="modal-text">${v}</p><p class="modal-text cap">${w}</p><hr><p class="modal-text">${x}</p><p class="modal-text cap">${y}</p></div></div>`;

    document.body.appendChild(modalContainer);
    window.modalCloseBtn = document.getElementsByTagName('STRONG'); 
    modalContainer.style.display = 'none';
    array.modalArray.push(modalContainer);
    array.modalStrong.push(modalCloseBtn);
}

/*************************
 *  FOR LOOP AND TIMEOUT
 *************************/

// Use for loop to append random employees via AJAX request to parse data from JSON with the Fetch API.
for (let i = 0; i < 12; ++i) {
    Promise.all([
        fetchData('https://randomuser.me/api/'),
    ])
        .then(data => {
        array.fetchArray[i] = [(data[0].results[0].picture.large), (data[0].results[0].name.first + " " + data[0].results[0].name.last), (data[0].results[0].email), (data[0].results[0].location.city), (data[0].results[0].phone), (data[0].results[0].location.street + ", " + data[0].results[0].location.state + ", " + data[0].results[0].location.postcode)];
    })
}

// Credit: innocentDrifter. Source: https://stackoverflow.com/questions/28583897/htmlcollection-item-function-returns-null.
setTimeout(() => {
    for (let i = 0; i < 12; ++i) {
        generateCardImgContainer(array.fetchArray[i][0], array.fetchArray[i][1], array.fetchArray[i][2], array.fetchArray[i][3]);
        generateModalContainer(array.fetchArray[i][0], array.fetchArray[i][1], array.fetchArray[i][2], array.fetchArray[i][3],array.fetchArray[i][4],array.fetchArray[i][5]);
    } 
    const cards = document.getElementsByClassName('card');
    for (let i = 0 ; i < 12 ; ++i) {
        cards.item(i).addEventListener('click', function() {
            array.modalArray[i].style.display = "block";
            window.modalCloseBtn.item(i).addEventListener('click', function() {
                array.modalArray[i].style.display = "none";
            });
        });
    }
}, 2000);