// Gets Monster Container & Select Input, Select Value & Submit/Random Button
var getMonsterContainer = document.getElementById('monster-container');
var getMonsterIconContainer = document.getElementById('monster-icon-container');
var randomMonster = document.getElementById('random-monster');
var monsterValue = document.getElementById('monster-value');

var getFooter = document.querySelector('.footer');

// Returned Json Data
let monsterObj = {};

// Monster Hunter API json
function fetchMonsterData() {
    fetch('./js/monsters.json')

    .then(result => {
        return result.json();
    })
    .then(data => {
        monsterObj = data;
        displayOptions();
        displayMonsterIcon();
    })
    .catch(error => console.log(error));
};

fetchMonsterData();

// Keeps track of option in selection when changed
monsterValue.addEventListener('change', () => getMonsterData(monsterValue.value));

// Random Button, Returns Random Monster
randomMonster.addEventListener('click', () => {
    var randomizer = Math.floor(Math.random() * monsterObj.length);
    var randomizedMonster = monsterObj[randomizer].name;
    console.log(randomizedMonster)
    getMonsterData(randomizedMonster)

    monsterValue.value = randomizedMonster;
});

// Displays Monster in the HTML
function getMonsterData(monsterID) {
    scrollToTop();
    // Hides Previous Result
    getMonsterContainer.innerHTML = "";
    getMonsterIconContainer.style.display = "none";
    // console.log(monsterObj.length)

    // Displays Footer
    getFooter.style.display = 'block';

    for (var i = 0; i < monsterObj.length; i++) {
        if (monsterObj[i].name == monsterID) {

            // Creates Div Then Contains Monster Info
            var displayMonster = document.createElement('div')
            displayMonster.classList.add('monster__details');

            displayMonster.innerHTML = `
                <div class="monster__details--render">
                    <img src="${monsterObj[i].render}" class="monster__details--render-img">
                </div>
                <div class="monster__details--info">
                    <h2 class="monster__details--heading">${monsterObj[i].name}</h2>
                    <p class="monster__details--text">${monsterObj[i].description}</p>

                    <p class="monster__details--text">
                        <span class="monster__details--text-main">Useful Information: </span>
                        ${monsterObj[i].useful_info}
                    </p>
                    <p class="monster__details--text">
                        <span class="monster__details--text-main">Species: </span>
                        ${monsterObj[i].species}
                    </p>
                    <p class="monster__details--text">
                        <span class="monster__details--text-main">Elements: </span>
                        ${monsterObj[i].elements.join(', ')}
                    </p>
                    <p class="monster__details--text">
                        <span class="monster__details--text-main">Ailments: </span>
                        ${monsterObj[i].ailments.join(', ')}
                    </p>
                    <p class="monster__details--text">
                        <span class="monster__details--text-main">Weakness: </span>
                        ${monsterObj[i].weakness.join(', ')}
                    </p>
                    <p class="monster__details--text">
                        <span class="monster__details--text-main">Resistances: </span>
                        ${monsterObj[i].resistances.join(', ')}
                    </p>
                </div>
            `;
            getMonsterContainer.appendChild(displayMonster);


            // Creates Location Heading
            var locationHeadingDiv = document.createElement('div');
            locationHeadingDiv.innerHTML = `<h2 class="secondary-heading">Locations</h2>`;
            getMonsterContainer.appendChild(locationHeadingDiv);


            // Creates Div Then Contains Monster Locale Info
            var displayLocale = document.createElement('div');
            displayLocale.classList.add('monster__location');


            // Creates Div for Every Single Locale Image/Name
            for (var l = 0; l < monsterObj[i].locations.length; l++) {

                var localeContainer = document.createElement('div')
                localeContainer.innerHTML = `
                    <p class="monster__location--name">${monsterObj[i].locations[l].name}</p>
                    <img src="${monsterObj[i].locations[l].img}" class="monster__location--img">
                `;
                
                displayLocale.appendChild(localeContainer);
                getMonsterContainer.appendChild(displayLocale);
            }

            // Enlarges Monster Render
            var monsterRender = document.querySelector('.monster__details--render-img');
            viewImage(monsterRender)

            // Enlarges Locale Image
            var localeImg = document.querySelectorAll('.monster__location--img');
            localeImg.forEach((localeImg) => viewImage(localeImg)) 
        }
    }
}

function displayMonsterIcon() {
    
    for (var i = 0; i < 12; i++) {
        
        var r = Math.floor(Math.random() * monsterObj.length);
        var randomizedMonster = monsterObj[r];
        // console.log(randomizedMonster)

        // Creates Div Then Contains Monster Icon Info
        var displayMonster = document.createElement('div')
        displayMonster.classList.add('monster__icons-box');

        displayMonster.innerHTML = `
            <p class="monster__icons-box--heading">${randomizedMonster.name}</p>
            <img src="${randomizedMonster.icon}" class="monster__icons-box--icon" alt="${randomizedMonster.name}">
        `;
        getMonsterIconContainer.appendChild(displayMonster);
    }

    // Monster Icons on Click
    var monsterIcon = document.querySelectorAll('.monster__icons-box--icon');
    monsterIcon.forEach(function (monsterIcon) {
        monsterIcon.addEventListener('click', function() {
            console.log(monsterIcon.alt)
            getMonsterData(monsterIcon.alt)
            monsterValue.value = monsterIcon.alt;
        })
    });
}

// Creates Options for Select Element
function displayOptions() {
    for (let i = 0; i < monsterObj.length; i++) {
        var createOption = document.createElement('option');
        createOption.classList.add('selection__options')
        createOption.setAttribute('id', 'selections')
        createOption.textContent = monsterObj[i].name;
        monsterValue.append(createOption)
    };
}


function viewImage(imgTarget) {
    var getModalContainer = document.getElementById('modal-container');
    var getModalImg = document.getElementById('modal-img')

    imgTarget.addEventListener('click', () => {
        getModalContainer.style.display = 'block';
        getModalImg.src = event.target.src
        console.log(event.target.src)
    })

    // Get's Modal Toggle & Removes Modal when Toggle is Clicked
    const getModalToggle = document.querySelector('.modal-container__toggle--icon');

    getModalToggle.addEventListener('click', () => {
        getModalContainer.style.display = 'none';
        getModalImg.src = "";
    })

    // Get image id and onclick, remove modal
    window.onclick = function(event) {
        if (event.target == getModalContainer || event.target == getModalImg) {
            getModalContainer.style.display = "none";
            getModalImg.src = "";
        }
    }
}


// Gradient & Image Background
function randomBackgroundImage() {
    var randombackground = Math.round(Math.random() * 6);
    var backgroundGradient = "linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 1)),";

    // Random Background
    var backgroundImages = [
        "url(img/locale/ancient-forest.jpg)",
        "url(img/locale/wildspire-waste.jpg)",
        "url(img/locale/rotten-vale.jpg)",
        "url(img/locale/coral-highlands.jpg)",
        "url(img/locale/elders-recess.jpg)",
        "url(img/locale/hoarfrost-reach.jpg)",
        "url(img/locale/guiding-lands.jpg)"
    ];

    // Displays Background Image & Gradient
    document.body.style.backgroundImage = backgroundGradient + backgroundImages[randombackground];
}

randomBackgroundImage()

// Scrolls to top
const scrollToTop = () => {
    const screenHeight = document.documentElement.scrollTop || document.body.scrollTop;
    if (screenHeight > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, screenHeight - screenHeight / 8);
    }
};