// DOM Query Selectors
var getHeader = document.querySelector('.header');
var getHeaderContent = document.querySelector('.header__content')
var getHeaderContainer = document.querySelector('.header__container')

var getMonsterInput = document.querySelector('.header__options--input');
var getMonsterSelection = document.querySelector('.header__options--select');
var getMonsterButton = document.querySelector('.header__options--button');

var getMonsterSection = document.querySelector('.section-monster');
var getMonsterDiv = document.querySelector('.monster');

var getLocaleSection = document.querySelector('.section-locales')
var getLocaleDiv = document.querySelector('.locales');

var getModalContainer = document.querySelector('.modal-container');
var getModalToggle = document.querySelector('.modal-container__toggle--icon');
var getModalImg = document.querySelector('.modal-container__img')

var getFooter = document.querySelector('.footer')

var getLoadingScreen = document.querySelector('.loading')

// Monster Hunter API json
function fetchMonsterData() {
    fetch('./js/monsters.json')

    .then(result => { return result.json(); })

    .then(data => {
        monsterObj = data;
        displayOptions();
    })
    .catch(error => console.log(error));
};
fetchMonsterData();

// Event Listeners for Input, Selection and Button. Returns Monster Data
getMonsterSelection.addEventListener('change', () => getMonsterData(getMonsterSelection.value));
getMonsterButton.addEventListener('click', () => getRandomMonsterData());
getMonsterInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 || event.which === 13) {
        getSearchedMonsterData();
    }
});

function getSearchedMonsterData() {
    var inputValue = getMonsterInput.value.toLowerCase();
    var monsterName = searchMonsterName(inputValue, monsterObj);

    if (inputValue == "" || inputValue == null) {
        window.alert("Please enter a monster name."); 

    } else if (monsterName !== inputValue) {
        window.alert('Monster does not exist.')

    } else {
        getMonsterData(inputValue)
        getMonsterSelection.value = inputValue;
        getMonsterInput.value = "";
    }
}

// Searches Specific Monster Name in monsters.json object array
function searchMonsterName(nameKey, monsterArray){
    for (var i = 0; i < monsterArray.length; i++) {
        if (monsterArray[i].name === nameKey) {
            return monsterArray[i].name;
        }
    }
}

// Retrieves Random Monster Data
function getRandomMonsterData() {
    var randomizer = Math.floor(Math.random() * monsterObj.length);
    var randomizedMonster = monsterObj[randomizer].name;
    getMonsterSelection.value = randomizedMonster;
    getMonsterData(randomizedMonster)
    getMonsterInput.value = "";
}

// Gets Monster Data and Displays in the HTML
function getMonsterData(monsterID) {
    loadResults();

    setTimeout( () => { 
        displayResults();

        for (var i = 0; i < monsterObj.length; i++) {
            if (monsterObj[i].name == monsterID) {
    
                // Creates Div Then Contains Monster Info
                var displayMonster = document.createElement('div');
                displayMonster.innerHTML = `
                    <!-- Monster Header -->
                    <div class="heading-1">
                        <img src="${monsterObj[i].icon}" class="heading-1--icon">
                        <h2 class="secondary--heading">
                            <span class="secondary-heading--main">${monsterObj[i].name}</span>
                            <span class="secondary-heading--sub">${monsterObj[i].species}</span>
                        </h2>
                    </div>

                    <!-- Monster Info -->
                    <div class="monster__container">
                        <div class="monster__render">
                            <img src="${monsterObj[i].render}" class="monster__render--img">
                        </div>
                        <div class="monster__info">
                            <p class="monster__desc">
                                <span class="monster__desc--subject">Ecology: </span>
                                ${monsterObj[i].description}
                            </p>

                            <p class="monster__desc">
                                <span class="monster__desc--subject">Useful Information: </span>
                                ${monsterObj[i].useful_info}
                            </p>

                            <div class="monster__grid-attributes">
                                <div>
                                    <p class="monster__desc--subject">Elements: </p>
                                    <ul class="monster__list list-elements"></ul>
                                </div>

                                <div>
                                    <p class="monster__desc--subject">Resistances: </p>
                                    <ul class="monster__list list-resistances"></ul>
                                </div>

                                <div>
                                    <p class="monster__desc--subject">Weakness: </p>
                                    <ul class="monster__list list-weakness"></ul>
                                </div>
                
                                <div>
                                    <p class="monster__desc--subject">Ailments: </p>
                                    <ul class="monster__list list-ailments"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                getMonsterDiv.appendChild(displayMonster);

                // Adds Monster Attributes
                createListItems('.list-ailments', monsterObj[i].ailments);
                createListItems('.list-elements', monsterObj[i].elements);
                createListItems('.list-resistances', monsterObj[i].resistances);
                createListItems('.list-weakness', monsterObj[i].weakness);

                // Creates Div Then Contains Monster Info
                var displayLocaleHeading = document.createElement('div');
                displayLocaleHeading.innerHTML = `
                    <div class="heading-2">
                        <img src="img/locale/map_icon.png" class="heading-2--icon">
                        <h2 class="secondary--heading">
                            <span class="secondary-heading--main">Locales</span>
                            <span class="secondary-heading--sub">The New World</span>
                        </h2> 
                    </div>
                    <div class="locales__grid"></div>
                `;
                getLocaleDiv.appendChild(displayLocaleHeading);

                // Creates Div for Every Single Locale Image/Name
                var getLocalesGrid = document.querySelector('.locales__grid');

                for (var l = 0; l < monsterObj[i].locations.length; l++) {
                    var createLocaleDiv = document.createElement('div')
                    createLocaleDiv.innerHTML = `
                        <img src="${monsterObj[i].locations[l].img}" class="locales__img">
                        <p class="locales__name">${monsterObj[i].locations[l].name}</p>
                    `;
                    getLocalesGrid.appendChild(createLocaleDiv);
                }

                // Enlarges Monster & Locale Images
                var monsterRender = document.querySelector('.monster__render--img');
                toggleModal(monsterRender)

                var localeImg = document.querySelectorAll('.locales__img');
                localeImg.forEach((localeImg) => toggleModal(localeImg)) 
            }
        }
    }, 700);
}

// Creates Monster Names Added into the Select Element
function displayOptions() {
    for (let i = 0; i < monsterObj.length; i++) {
        var createOption = document.createElement('option');
        createOption.classList.add('selection__options')
        createOption.setAttribute('id', 'selections')
        createOption.textContent = monsterObj[i].name;
        getMonsterSelection.append(createOption)
    };
}

// Function creates List items for the <ul> above
function createListItems(insertDOM, monsterAttributes) {

    // Gets UL in DOM
    var getList = document.querySelector(insertDOM)

    // for loop to iterate the strings inside that array
    for (i = 0; i < monsterAttributes.length; i++) {
        var createList = document.createElement('li');
        createList.classList.add('monster__list')

        // Add the item text
        createList.innerHTML = monsterAttributes[i];

        // Add to the ul
        getList.appendChild(createList);
    }
}

// Toggles Image Modal
function toggleModal(imgTarget) {
    imgTarget.addEventListener('click', (event) => {
        fadeAnimation(getModalContainer, 'fadeIn', 'block', 300)
        getModalContainer.style.display = 'block';
        getModalImg.src = event.target.src;
    });
    window.onclick = function(event) {
        if (event.target == getModalContainer || event.target == getModalImg || event.target == getModalToggle) {
            fadeAnimation(getModalContainer, 'fadeOut', 'none', 300)
        };
    };
};

// Toggles Fade In & Out Animation
function fadeAnimation(target, type, display, timer) {
    target.classList.add(type);
    setTimeout( () => { 
        target.classList.remove(type);
        target.style.display = display;
    }, timer);
}

// Loads Results
function loadResults() {
    // Hides Previous Result
    getMonsterDiv.innerHTML = "";
    getLocaleDiv.innerHTML = "";

    // Hides/Disables Elements
    getMonsterSection.style.display = "none";
    getLocaleSection.style.display = "none";
    getFooter.style.display = "none";
    getMonsterInput.disabled = true;

    // Displays Loading Spinner
    getLoadingScreen.classList.add('spinner');
}

// Displays Results to the DOM
function displayResults() {
    // Displays/Enables Elements
    getMonsterSection.style.display = "block";
    getLocaleSection.style.display = "block";
    getFooter.style.display = 'block';
    getMonsterInput.disabled = false;
    fadeAnimation(getMonsterDiv, 'fadeUp', 'block', 400);
    // Removes Spinner
    getLoadingScreen.classList.remove('spinner');

    // Scrolls to Monster Section
    $('html, body').animate({scrollTop: $('.section-monster').offset().top}, 300);
};

// Random Background Images
function randomBackgroundImage() {
    var randombackground = Math.round(Math.random() * 7);
    var backgroundImages = [
        "url(img/locale/ancient-forest.jpg)",
        "url(img/locale/wildspire-waste.jpg)",
        "url(img/locale/rotten-vale.jpg)",
        "url(img/locale/coral-highlands.jpg)",
        "url(img/locale/elders-recess.jpg)",
        "url(img/locale/hoarfrost-reach.jpg)",
        "url(img/locale/guiding-lands.jpg)",
        "url(img/locale/castle-schrade.jpg)"
    ];
    getHeader.style.backgroundImage = backgroundImages[randombackground];
};
randomBackgroundImage();