import { characters } from "./characters.js";
export const themes = {
    default: { name: null, isSpoiler: false },
    doyleBirthday: { name: "doyleBirthday", isSpoiler: false, message: '<b style="color: var(--gold)">Happy Asobaro week!</b><br>28 May - 3 Jun #asobaroweek2023' },
    asobaroWeek: { name: "asobaro", isSpoiler: true, message: '<b style="color: var(--gold)">Happy Asobaro week!</b><br>28 May - 3 Jun #asobaroweek2023' },
    baroasoryuuWeek: { name: "baroasoryuu", isSpoiler: true, message: '<b style="color: var(--red)">Happy BaroAsoRyuu week!</b><br>1-7 May #baroasoryuuweek2023' },
    cumberbatch: { name: 'cumberbatch', isSpoiler: false, message: "Nothing suspicious here" },
    fathersDay: { name: "homumiko", isSpoiler: true, message: "Happy Father's Day - 18th Jun" },
    homumikoWeek: { name: "homumiko", isSpoiler: true, message: "Happy Homumiko week!" },
    ryuulockWeek: { name: "ryuulock", isSpoiler: false, message: '<b style="color: var(--gold)">Happy Ryuulock week!</b><br>17-23 April #ryuulockweek2023' },
};
function isBetweenDates(startDate, endDate) {
    const currentDate = new Date();
    const myEndDate = new Date(endDate).getTime() + 24 * 60 * 60 * 1000; // Set it to the end of the date to make it easier
    return (currentDate >= new Date(startDate) && currentDate <= new Date(myEndDate));
}
export function setTheme() {
    let myTheme = null;
    let currentYear = new Date().getFullYear();
    if (isBetweenDates(currentYear + "-04-01", currentYear + "-04-07")) {
        initialiseCumberbatchTheme();
        myTheme = themes.cumberbatch;
    }
    if (isBetweenDates("2023-04-17", "2023-04-23")) {
        myTheme = themes.ryuulockWeek;
    }
    if (isBetweenDates("2023-05-01", "2023-06-07")) {
        myTheme = themes.baroasoryuuWeek;
    }
    if (isBetweenDates("2023-05-28", "2023-06-03")) {
        myTheme = themes.asobaroWeek;
    }
    if (isBetweenDates("2023-06-18", "2023-06-18")) {
        myTheme = themes.fathersDay;
    }
    if (myTheme === null || myTheme === void 0 ? void 0 : myTheme.message) {
        let bannerBottom = document.createElement('div');
        bannerBottom.innerHTML = `
        <div id="banner-bottom">
        <div id="banner-bottom-message">${myTheme.message}</div>
        <div class="theme-star"></div>
        <div class="theme-star"></div>
      </div>
    `;
        document.querySelector('#banner').appendChild(bannerBottom);
    }
    return myTheme !== null && myTheme !== void 0 ? myTheme : themes.default;
}
/* APRIL FOOLS 2023 - BENEDICT CUMBERBATCH THEME -----------------------------*/
export function initialiseCumberbatchTheme() {
    const benedictAlternateForenames = [
        "Buttercup",
        "Bendydoodle",
        "Bonkyhort",
        "Bodysnatch",
        "Beetleborg",
        "Bumblebee",
        "Blunderbuss",
        "Bubblebath",
        "Bulbasaur",
        "Billiardball",
        "Butterfree",
        "Bendyboot",
        "Banister"
    ];
    const benedictAlternateSurnames = [
        "Cumbersnatch",
        "Crackerdoodle",
        "Crunchynut",
        "Cummerbund",
        "Cabbagepatch",
        "Cuttlefish",
        "Cottonswab",
        "Crumpetsnitch",
        "Crumblescrunch",
        "Charizard",
        "Candlestick",
        "Crackerjack",
        "Custardbath",
        "Candycrush",
        "Counterstrike",
        "Cinderblock"
    ];
    // Generate a new random name for Benedict Cumberbatch
    function generateRandomCumberbatchName() {
        let forename = benedictAlternateForenames[Math.floor(Math.random() * benedictAlternateForenames.length)];
        let surname = benedictAlternateSurnames[Math.floor(Math.random() * benedictAlternateForenames.length)];
        return forename + ' ' + surname;
    }
    // Add Benedict Cumberbatch to the characters array
    characters.unshift({
        name: "Sherlock Holmes",
        id: "holmes-benedict",
        variant: generateRandomCumberbatchName(),
        gender: 'male',
        nationality: 'british',
        appearsIn: [false, false, false, false, false, false, false, false, false, false],
        images: 5,
        tags: ['cumberbatch'],
        lastUpdated: "Apr 01 9999",
        posesAddedOnLastUpdate: 5
    });
    // Display the random name on the page
    function displayNewBenedictName() {
        const benedictLabel = document.querySelector('.character-icon[value="holmes-benedict"] .variant-tag');
        if (benedictLabel) {
            benedictLabel.textContent = generateRandomCumberbatchName();
        }
    }
    // Start off with a new random name
    let benedict = characters.find((character) => character.id === "holmes-benedict");
    if (benedict) {
        benedict.variant = generateRandomCumberbatchName();
    }
    // Every 10 seconds, give Benedict a new name
    window.setInterval(displayNewBenedictName, 10000);
}
