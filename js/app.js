// DOM Query Selectors
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

// Retrieves Random Monster
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
    getFooter.style.display = "none";

    // Adds Loading Spinner
    getMonsterContainer.classList.add('loading');
    getMonsterIconContainer.style.display = "none";

    setTimeout( () => { 
        getMonsterContainer.classList.remove('loading');
        getFooter.style.display = 'block';
        fadeAnimation(getMonsterContainer, 'fadeUp', 'block', 400);

        for (var i = 0; i < monsterObj.length; i++) {
            if (monsterObj[i].name == monsterID) {
    
                // Creates Div Then Contains Monster Info
                var displayMonster = document.createElement('div');

            //     <p class="monster-box__text">
            //     <span class="monster-box__text-main">Elements: </span>
            //     ${monsterObj[i].elements.join(', ')}
            // </p>

            // <p class="monster-box__text">
            //     <span class="monster-box__text-main">Resistances: </span>
            //     ${monsterObj[i].resistances.join(', ')}
            // </p>



                displayMonster.innerHTML = `

                    <!-- Contains Monster Name and Icon -->
                    <div class="monster__heading-box-1">
                        <img src="${monsterObj[i].icon}" class="monster__heading-box-1--icon">

                        <h2 class="secondary--heading">
                            <span class="secondary-heading--main">${monsterObj[i].name}</span>
                            <span class="secondary-heading--sub">${monsterObj[i].species}</span>
                        </h2>
                    </div>




                    <div class="monster-box">
                        <div class="monster-box__render">
                            <img src="${monsterObj[i].render}" class="monster-box__render--img">
                        </div>

                        <div class="monster-box__info">

                            <p class="monster-box__text">
                                <span class="monster-box__text-main">Ecology: </span>
                                ${monsterObj[i].description}
                            </p>


                            <p class="monster-box__text">
                                <span class="monster-box__text-main">Useful Information: </span>
                                ${monsterObj[i].useful_info}
                            </p>

 
                            <div class="monster-box__grid-list">
                                <!-- Monster Element -->
                                <div>
                                    <p class="monster-box__text-main">Elements: </p>
                                    <ul class="monster-box__list list-elements"></ul>
                                </div>

                                <!-- Monster Resistances -->
                                <div>
                                    <p class="monster-box__text-main">Resistances: </p>
                                    <ul class="monster-box__list list-resistances"></ul>
                                </div>

                                <!-- Monster Weaknesses -->
                                <div>
                                    <p class="monster-box__text-main">Weakness: </p>
                                    <ul class="monster-box__list list-weakness"></ul>
                                </div>

                                <!-- Monster Ailments -->       
                                <div>
                                    <p class="monster-box__text-main">Ailments: </p>
                                    <ul class="monster-box__list list-ailments"></ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="monster__heading-box-2">
                        <img src="img/locale/map_icon.png" class="monster__heading-box-2--icon">
                        <h2 class="secondary--heading">
                            <span class="secondary-heading--main">Locales</span>
                            <span class="secondary-heading--sub">The New World</span>
                        </h2> 
                    </div>
                    
                    <div class="monster-box__location"></div>
                `;
                getMonsterContainer.appendChild(displayMonster);


                // Adds a Fade in animation to the Monster's name
                var getMonsterHeading = document.querySelector('.monster__heading-box-1')
                getMonsterHeading.classList.add('monsterHeaderWidth')






                // Function creates List items for the <ul> above
                function createListItems(insertDOM, monsterProperty) {

                    // Gets UL in DOM
                    var getList = document.querySelector(insertDOM)

                    // for loop to iterate the strings inside that array
                    for (w = 0; w < monsterProperty.length; w++) {

                        // creates an li with the class of '.monster-box__list' for each one
                        var createList = document.createElement('li');
                        createList.classList.add('monster-box__list')
                
                        // Add the item text
                        createList.innerHTML = monsterProperty[w];
                
                        // Add to the ul
                        getList.appendChild(createList);
                    }
                }

                createListItems('.list-ailments', monsterObj[i].ailments);
                createListItems('.list-elements', monsterObj[i].elements);
                createListItems('.list-resistances', monsterObj[i].resistances);
                createListItems('.list-weakness', monsterObj[i].weakness);


    
                // Gets Div To Input Monster Locale Images
                var getMonsterLocationDiv = document.querySelector('.monster-box__location')
                
                // Creates Div for Every Single Locale Image/Name
                for (var l = 0; l < monsterObj[i].locations.length; l++) {
    
                    var localeContainer = document.createElement('div')
                    localeContainer.innerHTML = `
                        <p class="monster-box__location--name">${monsterObj[i].locations[l].name}</p>
                        <img src="${monsterObj[i].locations[l].img}" class="monster-box__location--img">
                    `;
                    getMonsterLocationDiv.appendChild(localeContainer);
                    getMonsterContainer.appendChild(getMonsterLocationDiv);
                }
    
                // Enlarges Monster & Locale Images
                var monsterRender = document.querySelector('.monster-box__render--img');
                toggleModal(monsterRender)

                var localeImg = document.querySelectorAll('.monster-box__location--img');
                localeImg.forEach((localeImg) => toggleModal(localeImg)) 
            }
        }
    }, 600);
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

        // Creates Div Then Contains Monster Icon Info
        for (var i = 0; i < 10; i++) {
            var randomMonsterIcon = shuffle(monsterObj[i]) 

            var displayMonster = document.createElement('div')
            displayMonster.classList.add('monster__icons-box');

            displayMonster.innerHTML = `
                <h2 class="monster__icons-box--heading">
                    <span class="monster__icons-box--heading-main">${randomMonsterIcon.name}</span>
                    <span class="monster__icons-box--heading-sub">${randomMonsterIcon.species}</span>
                </h2>
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

// Toggles Image Modal
function toggleModal(imgTarget) {

    imgTarget.addEventListener('click', () => {
        fadeAnimation(getModalContainer, 'fadeIn', 'block', 300)
        getModalContainer.style.display = 'block';
        getModalImg.src = event.target.src
    });
    window.onclick = function(event) {
        if (event.target == getModalContainer || event.target == getModalImg || event.target == getModalToggle) {
            fadeAnimation(getModalContainer, 'fadeOut', 'none', 300)
        };
    };
};

// Scrolls to top
const scrollToTop = () => {
    const screenHeight = document.documentElement.scrollTop || document.body.scrollTop;
    if (screenHeight > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, screenHeight - screenHeight / 8);
    }
};

// Toggles Fade In & Out Animation
function fadeAnimation(target, type, display, timer) {
    target.classList.add(type);
    setTimeout( () => { 
        target.classList.remove(type);
        target.style.display = display;
    }, timer);
}

// Gradient & Random Background Images
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