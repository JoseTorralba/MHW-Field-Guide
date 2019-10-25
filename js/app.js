// Gets Monster Container & Select Input, Select Value & Submit/Random Button
var getMonsterContainer = document.querySelector('.monster');
var getMonsterIconContainer = document.querySelector('.monster__icons');

var monsterBtn = document.querySelector('.options__monster-btn');
var monsterValue = document.querySelector('.options__monster-list');

var getModalContainer = document.querySelector('.modal-container');
var getModalToggle = document.querySelector('.modal-container__toggle--icon');
var getModalImg = document.querySelector('.modal-container__img')

var getFooter = document.querySelector('.footer')

// Monster Hunter API json
function fetchMonsterData() {
    fetch('./js/monsters.json')

    .then(result => { return result.json(); })

    .then(data => {
        monsterObj = data;
        displayOptions();
        displayMonsterIcon();
    })
    .catch(error => console.log(error));
};
fetchMonsterData();

// Option Value on Change & Random Button on Click. Both Return Monster Data.
monsterValue.addEventListener('change', () => getMonsterData(monsterValue.value));
monsterBtn.addEventListener('click', () => getRandomMonsterData());


function getRandomMonsterData() {
    var randomizer = Math.floor(Math.random() * monsterObj.length);
    var randomizedMonster = monsterObj[randomizer].name;

    monsterValue.value = randomizedMonster;
    getMonsterData(randomizedMonster)
}


// Displays Monster in the HTML
function getMonsterData(monsterID) {

    scrollToTop();

    // Hides Previous Result
    getMonsterContainer.innerHTML = "";
    getMonsterContainer.classList.add('loading')
    getMonsterIconContainer.style.display = "none";
    getFooter.style.display = 'none'

    setTimeout( () => { 
        getMonsterContainer.classList.remove('loading')
        getFooter.style.display = 'block'
        fadeInAnimation(getMonsterContainer, 'fadeUp');

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
                toggleModal(monsterRender)
    
                // Enlarges Locale Image
                var localeImg = document.querySelectorAll('.monster__location--img');
                localeImg.forEach((localeImg) => toggleModal(localeImg)) 
            }
        }
    }, 600);
}

// Function will Shuffle Array Items
function shuffle(array) {
    var randomIndex, temp, i;

    for (i = array.length - 1; i > 0; i--) {
        
        randomIndex = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

// Displays Random Monster Icons
function displayMonsterIcon() {

    // This is Needed to Randomize
    var randomMonsterIcon = shuffle(monsterObj);
    getMonsterIconContainer.classList.add('loading')

    setTimeout(() => {
        getMonsterIconContainer.classList.remove('loading')
        getMonsterIconContainer.classList.add('fadeIn')
        getMonsterIconContainer.style.animationDuration = '.5s';


        for (var i = 0; i < 12; i++) {

            var randomMonsterIcon = shuffle(monsterObj[i]) 
            // console.log(randomMonsterIcon)

            // Creates Div Then Contains Monster Icon Info
            var displayMonster = document.createElement('div')
            displayMonster.classList.add('monster__icons-box');

            displayMonster.innerHTML = `
            <p class="monster__icons-box--heading">${randomMonsterIcon.name}</p>
            <img src="${randomMonsterIcon.icon}" class="monster__icons-box--icon" alt="${randomMonsterIcon.name}">
            `;
            getMonsterIconContainer.appendChild(displayMonster);

        }
        monsterIconOnClick()
        
    }, 800);
}


// Monster Icons on Click
function monsterIconOnClick() {
    var monsterIcon = document.querySelectorAll('.monster__icons-box--icon');
    monsterIcon.forEach(function (monsterIcon) {
        monsterIcon.addEventListener('click', function() {

            getMonsterData(monsterIcon.alt)
            monsterValue.value = monsterIcon.alt;
        })
    });
}


// Creates Monster Names Added into the Select Element
function displayOptions() {
    for (let i = 0; i < monsterObj.length; i++) {
        var createOption = document.createElement('option');
        createOption.classList.add('selection__options')
        createOption.setAttribute('id', 'selections')
        createOption.textContent = monsterObj[i].name;
        monsterValue.append(createOption)
    };
}


// Toggles Image Modal
function toggleModal(imgTarget) {

    imgTarget.addEventListener('click', () => {
        fadeInAnimation(getModalContainer, 'fadeIn')
        getModalContainer.style.display = 'block';
        getModalImg.src = event.target.src
    })

    window.onclick = function(event) {
        if (event.target == getModalContainer || event.target == getModalImg || event.target == getModalToggle) {
            fadeOutAnimation(getModalContainer, 'fadeOut')
        }
    }
}


// Gradient & Random Image Background
function randomBackgroundImage() {
    var randombackground = Math.round(Math.random() * 6);
    var backgroundGradient = "linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 1)),";
    var backgroundImages = [
        "url(img/locale/ancient-forest.jpg)",
        "url(img/locale/wildspire-waste.jpg)",
        "url(img/locale/rotten-vale.jpg)",
        "url(img/locale/coral-highlands.jpg)",
        "url(img/locale/elders-recess.jpg)",
        "url(img/locale/hoarfrost-reach.jpg)",
        "url(img/locale/guiding-lands.jpg)"
    ];
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


// Fade In & Out Animations
function fadeOutAnimation(target, type) {
    target.classList.add(type);

    setTimeout( () => { 
        target.classList.remove(type);
        target.style.display = 'none';
        // target.src = "";
    }, 300);
}

function fadeInAnimation(target, type) {
    target.classList.add(type);
    setTimeout( () => { target.classList.remove(type) }, 400);
}
