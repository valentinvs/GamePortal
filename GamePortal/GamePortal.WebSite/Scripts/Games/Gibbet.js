var LowerDash = '_';
var EmptySpace = ' ';
var GameContainer = jQuery('#GameContainer');
var ErrorsCount = 0;
var Gibbet = $('#Gibbet');

function renderAllowedLetters() {
    var allowedLetters = $("#AllowedLettersContainer")

    for (var i = 65; i <= 90; i++) {
        allowedLetters.append($("<div>", { class: "allowedLetter" }).text(String.fromCharCode(i)));
    }

    GameContainer.append(allowedLetters);
}

function getRandomNumberRange(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
}

function generateLettersContainers(count, symbolToDisplay, value) {
    var letters = [];
    for (var index = 0; index < count; index++) {
        var letter = $("<div>", { class: "letter hidden" });

        if (symbolToDisplay == EmptySpace) {
            letter.addClass('space');
            letter.removeClass('letter');
        }

        letter.val(value[index]);
        letters.push(letter);
    }

    return letters;
}

function renderBoard() {
    updateGibbet();
    var allCities = "Russia,Ukraine,France,Spain,Sweden,Norway,Germany,Finland,Poland,Italy,United Kingdom,Romania,Belarus,Kazakhstan,Greece,Bulgaria,Iceland,Hungary,Portugal,Serbia,Ireland,Austria,Czech Republic,Georgia,Lithuania,Latvia,Croatia,Slovakia,Estonia,Denmark,Netherlands,Switzerland,Moldova,Belgium,Albania,Macedonia,Turkey,Slovenia,Montenegro,Cyprus,Azerbaijan,Luxembourg,Andorra,Malta,Liechtenstein,San Marino,Monaco,Vatican City"
    var citiesArray = allCities.split(',');

    var randomNumber = getRandomNumberRange(0, citiesArray.length - 1);
    var randomCity = citiesArray[randomNumber];

    var cityNameParts = randomCity.split(EmptySpace);

    var lettersToGuessContainer = $('#LettersToGuessContainer');

    if (cityNameParts.length > 1) {
        var cityLettersFirstPart = generateLettersContainers(cityNameParts[0].length, LowerDash, cityNameParts[0]);
        var cityLettersSecondPart = generateLettersContainers(cityNameParts[1].length, LowerDash, cityNameParts[1]);

        lettersToGuessContainer.append(cityLettersFirstPart);
        lettersToGuessContainer.append($("<div>", { class: "space" }));
        lettersToGuessContainer.append($("<div>", { class: "space" }));
        lettersToGuessContainer.append(cityLettersSecondPart);
    } else {
        var cityLetters = generateLettersContainers(randomCity.length, LowerDash, randomCity);
        lettersToGuessContainer.append(cityLetters);
    }
}

function displayLetter(letter) {
    letter.text(letter.val());
    $(letter).removeClass('hidden');
}

function displayAllLetters() {
    var allHiddenLeft = $('.hidden');
    allHiddenLeft.each(function () {
        $(this).text($(this).val());
    });
}

function updateGibbet() {
    $(Gibbet).css("background-image", "url(../../images/Games/Gibbet/" + ErrorsCount + "Errors.png)");
}

function checkForMatch(letterClicked) {
    var allHiddenLetters = $('.hidden');
    var matchExists = false;

    allHiddenLetters.each(function () {
        if ($(this).val().toLowerCase() == letterClicked.innerText.toLowerCase()) {
            displayLetter($(this));
            matchExists = true;
        }
    });

    return matchExists;
}

function checkForWin(lastGuessResult) {
    if (lastGuessResult) {
        var allHiddenLeft = $('.hidden');
        if (allHiddenLeft.length == 0) {
            alert('You WON!');
            restart();
        }
    } else {
        if (ErrorsCount == 6) {
            displayAllLetters();
            alert('You have lost the game');
            restart();
        }
    }
}

function startGame() {
    renderBoard();

    var allLetters = $('.allowedLetter');
    allLetters.each(function (index) {
        var that = this;
        $(that).click(function (event) {

            letterClicked = event.target;

            if ($(letterClicked).hasClass("disabled")) {
                return false;
            }

            var lastGuessResult = checkForMatch(letterClicked);

            if (!lastGuessResult) {
                ErrorsCount = ErrorsCount + 1;
                updateGibbet();
            }

            $(letterClicked).attr('disabled', 'disabled');
            $(letterClicked).addClass('disabled');

            checkForWin(lastGuessResult);
        });
    });
}

function restart() {
    ErrorsCount = 0;
    updateGibbet();
    var allowedLetters = $('.allowedLetter');
    allowedLetters.each(function () {
        $(this).removeClass("disabled");
        $(this).removeAttr('disabled');
    });

    var lettersToGuessContainer = $('#LettersToGuessContainer');
    lettersToGuessContainer.html("");

    startGame();
}

renderAllowedLetters();
startGame();