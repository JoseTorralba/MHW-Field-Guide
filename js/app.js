// Gets Monster Container & Select Input, Select Value & Submit/Random Button
var getMonsterContainer = document.getElementById('monster-container');
var submitMonster = document.getElementById('submit-monster');
var randomMonster = document.getElementById('random-monster');
var monsterValue = document.getElementById('monster-value');

var displayFooter = document.querySelector('.footer');

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
    })
    .catch(error => console.log(error));
};

fetchMonsterData();

// Submit Button
submitMonster.addEventListener('click', () => getMonsterData(monsterValue.value));

// Random Button
randomMonster.addEventListener('click', () => {
    
    var randomizer = Math.round(Math.random() * monsterObj.length);
    var randomizedMonster = monsterObj[randomizer].name;
    console.log(randomizedMonster)
    getMonsterData(randomizedMonster)

    monsterValue.value = randomizedMonster;
});
    

// Displays Monster in the HTML
function getMonsterData(monsterID) {

    // Hides Previous Result
    getMonsterContainer.innerHTML = "";

    console.log(monsterObj.length)
    // Displays Footer
    displayFooter.style.display = 'block';

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
                    <p class="monster__details--heading">${monsterObj[i].name}</p>
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
            var displayLocale = document.createElement('div');
            displayLocale.classList.add('monster__location');

            for (let l = 0; l < monsterObj[i].locations.length; l++) {

                // Creates Div for Every Single Location
                var localeContainer = document.createElement('div')

                // Creates Location Heading
                var localeName = document.createElement('h3');
                localeName.classList.add('monster__location--name')
                localeName.textContent = monsterObj[i].locations[l].name;
                localeContainer.appendChild(localeName)

                // Creates Location Image
                const localeImg = new Image();
                localeImg.classList.add('monster__location--img')
                localeImg.src = monsterObj[i].locations[l].img;
                localeImg.alt = monsterObj[i].locations[l].name;

                // Enlarges Monster Render
                var monsterRender = document.querySelector('.monster__details--render-img');
                viewImage(monsterRender)

                // Enlarges Locale Image
                viewImage(localeImg)

                localeContainer.appendChild(localeImg)
                displayLocale.appendChild(localeContainer)
            };
            getMonsterContainer.appendChild(displayLocale);
        }
    }
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
    var backgroundGradient = "linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, .8)),";

    // Random Background
    var backgroundImages = [
        "url(../img/locale/ancient-forest.jpg)",
        "url(../img/locale/wildspire-waste.jpg)",
        "url(../img/locale/rotten-vale.jpg)",
        "url(../img/locale/coral-highlands.jpg)",
        "url(../img/locale/elders-recess.jpg)",
        "url(../img/locale/hoarfrost-reach.jpg)",
        "url(../img/locale/guiding-lands.jpg)"
    ];

    // Displays Background Image & Gradient
    document.body.style.backgroundImage = backgroundGradient + backgroundImages[randombackground];
}

randomBackgroundImage()


